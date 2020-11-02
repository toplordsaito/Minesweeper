import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
@Injectable()
export class UserService {
  constructor(@Inject('User_REPOSITORY') private UserRepository: typeof User) {}
  async findOrCreate(profile: any): Promise<User> {
    const user = await this.UserRepository.findOne<User>({ where:{'facebookid': profile.id }});
    if (user) {
      return user;
    }
    const createdUser = await this.UserRepository.create<User>({
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      facebookid: profile.id,
      avatar: profile.photos[0].value,
    });
    return createdUser;
  }

 

  async leaderBoard(): Promise<any> {
    const leaderboard = await this.UserRepository.findAll<User>({
      order: [['elorank', 'DESC']]
    })
    return leaderboard
  }

  async getUserById(id: any): Promise<any> {
    const user = await this.UserRepository.findByPk(id)
    return user
  }

  async eloRanking(player1Id: any, player2Id:any, score1: any, score2: any): Promise<any> {
    const player1 = await this.UserRepository.findByPk(player1Id)
    const player2 = await this.UserRepository.findByPk(player2Id)
    const avg = (player1.elorank + player2.elorank) / 2
    const k = (avg < 400)?40:(avg < 800)?35:(avg < 1200)?30:(avg < 1600)?25:(avg < 2000)?20:(avg < 2400)?15:10
    // const k1 = (player1.elorank < 800)?40:(player1.elorank < 1600)?30:(player1.elorank < 2400)?20:10
    // const k2 = (player2.elorank < 800)?40:(player2.elorank < 1600)?30:(player2.elorank < 2400)?20:10
    const expectedScore1 = 1/(1+10**((player2.elorank - player1.elorank)/400))
    const expectedScore2 = 1/(1+10**((player1.elorank - player2.elorank)/400))

    // player1
    const point1 = k * (score1 - expectedScore1)
    console.log("Player 1 : " + point1)
    const newPlayer1:any = (player1.elorank+point1)
    player1.update({elorank: Math.max(0, newPlayer1.toFixed(0))})
    // player2
    const point2 = k * (score2 - expectedScore2)
    console.log("Player 2 : " + point2)
    const newPlayer2:any = (player2.elorank+point2)
    player2.update({elorank: Math.max(0 , newPlayer2.toFixed(0))})
    return [player1, player2]
  }
  
}
