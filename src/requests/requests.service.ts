import { Injectable, Logger, BadRequestException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { createStatusDto } from './dto/create-status.dto';
import { serviceErrorHandler } from 'src/common/services.error.handler';
import { CreateNewRequestDto } from './dto/create-new-request.dto';

@Injectable()
export class RequestsService {
  private readonly logger = new Logger(RequestsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async getCurrentStatus(id: number) {
    try {
      const currentStatus = await this.prismaService.requests.findFirst({
        where: {
          user: id,
        },
        orderBy: {
          date_update: 'desc',
        },
      });

      return currentStatus;
    } catch (error: any) {
      this.logger.error('ERROR: getCurrentStatus');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async updateStatus(updated: createStatusDto, approver: number) {
    try {
      const current = await this.getCurrentStatus(updated.user);
      const mismatchedStatus =
        current.request_status !== updated.current_status;
      const sameStatus = current.request_status === updated.next_status;

      if (mismatchedStatus) {
        throw new BadRequestException(`User ${updated.user} status mismatched`);
      }

      if (sameStatus) {
        throw new BadRequestException(
          `User ${updated.user} already has this status`,
        );
      }

      return await this.prismaService.requests.create({
        data: {
          user: updated.user,
          request_status: updated.next_status,
          request_type: current.request_type,
          approver: approver,
        },
      });
    } catch (error: any) {
      this.logger.error('ERROR: updateStatus');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async getAllLatestStatuses() {
    try {
      const statuses = await this.prismaService.requests.groupBy({
        by: ['user'],
        _max: {
          request_status: true,
        },
        orderBy: { user: 'asc' },
      });

      return statuses;
    } catch (error: any) {
      this.logger.error('ERROR: getCurrentStatus');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async createNewRequest(data: CreateNewRequestDto) {
    try {
      const user = await this.getCurrentStatus(data.user);
      if (user) {
        throw new BadRequestException(
          'User already has new card request, please ensure the card from user',
        );
      }

      data.request_status = 0;

      await this.prismaService.requests.create({ data: data });
    } catch (error: any) {
      this.logger.error('ERROR: createNewRequest');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }

  async deleteRequestByID(user_id: number) {
    try {
      const request = await this.getCurrentStatus(user_id);
      const isInitiate = request.request_status !== 0;
      if (!request || isInitiate) {
        throw new BadRequestException('Bad request by user');
      }

      await this.prismaService.requests.delete({
        where: { req_id: request.req_id },
      });
    } catch (error: any) {
      this.logger.error('ERROR: deleteRequest');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }
}
