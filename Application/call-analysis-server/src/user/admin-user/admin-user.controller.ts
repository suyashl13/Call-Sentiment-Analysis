import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { CheckTokenExpiryGuard } from 'src/common/guards/check-token-expiry.guard';
import { UserService } from '../user.service';
import { SearchEmployeeDto } from '../dtos/search-user-dto';

@UseGuards(AuthenticationGuard, CheckTokenExpiryGuard)
@UseGuards(new AuthorizationGuard(0))
@Controller('admin-user')
export class AdminUserController {
    constructor(private readonly usersServices: UserService) {}

    @Get("/all-employees")
    async findAll() {
        return await this.usersServices.findAllEmployees();
    } 

    @Patch("/change-active-status/:id")
    async changeActiveStatus(@Param('id') id: string) {
        return await this.usersServices.changeActiveStatus(id);
    }

    @Get("/employee/:id")
    async getProfile(@Query("id") id: string) {
        return await this.usersServices.findOne(id);
    }

    @Get("/search-employee")
    async searchEmployee(@Query() searchQueryParams: SearchEmployeeDto) {
        return this.usersServices.searchEmployee(searchQueryParams);
    }
}
