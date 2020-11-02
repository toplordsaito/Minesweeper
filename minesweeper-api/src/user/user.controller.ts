import { Controller, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiBody } from '@nestjs/swagger';
import { User } from '../entity/user.entity';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
    constructor(private UserService: UserService) {}
    // @ApiResponse({
    //     status: 201,
    //     description: 'Successful to  User',
    //   })
    //   @ApiBody({
    //     description: 'User',
    //   })
    //   //@UseGuards(AuthGuard())
    //   @Get()
    //   async loginGuest(): Promise<any> {
    //     return this.UserService.createGuestUser();
    //   }

      @ApiResponse({
        status: 201,
        description: 'Successful to  User',
      })
      @ApiBody({
        description: 'User',
      })
      @Get('leaderboard')
      async leaderBoard(): Promise<User[]> {
        return this.UserService.leaderBoard();
      }

      @ApiResponse({
        status: 201,
        description: 'Successful to  User',
      })
      @ApiBody({
        description: 'User',
      })
      @Get('/:id')
      async getUserById(@Param('id') id: number): Promise<User[]> {
        return this.UserService.getUserById(id);
      }

      @ApiResponse({
        status: 201,
        description: 'Successful to  User',
      })
      @ApiBody({
        description: 'User',
      })
      @Get('/:player1Id/:player2Id/:score1/:score2')
      async eloRanking(@Param('player1Id') player1Id: number, @Param('player2Id') player2Id: number ,@Param('score1') score1: number, @Param('score2') score2: number): Promise<User[]> {
        return this.UserService.eloRanking(player1Id, player2Id, score1, score2);
      }
}
