import { Show,APlugin ,AMessage,pic ,findIndexByName,Strand,getNonZeroKeys,startstatus,stopstatus,gettupo,getstring,checkZeroValue,checkAllZeroValues,
  checkNameExists,player_zhanli,Add_bag_thing, player_zhandou,determineWinner,getB_qq,createPlayerObject } from "../../api";
  import { create_player,existplayer,Read_player,Write_player,武者境界, 灵魂境界,体魄境界,user_id,finduid} from '../../model/gameapi';
export class dajie extends APlugin  {
	constructor() {
		super({
			/** 功能名称 */
			name: 'dajie',
			/** 功能描述 */
			dsc: '基础模块',
			event: 'message',
			/** 优先级，数字越小等级越高 */
			priority: 600,
			rule: [
				{
					reg: /^(#|\/)打劫.*$/,
					fnc: 'jie',
        },
        {
					reg: /^(#|\/)比斗.*$/,
					fnc: 'bidou',
        },
        {
					reg: /^(#|\/)gbgbgbgbgbgbgbg.*$/,
					fnc: 'at',
        },
			],
		});
	}
    async jie(e:AMessage):Promise<boolean> {
        const usr_qq = e.user_id;
        if (!await existplayer(1, usr_qq)) return false;
        let B_player_results:any = await getB_qq(e, "player");
        let B_player = B_player_results.player;
        let B_id = await getB_qq(e, "id");
        if (!B_player) return false;
        let results = await Read_player(1,usr_qq)
        let player = results.player;
        if (player.当前生命 < 50) return e.reply(`先去治疗吧`);
        const A_player = await createPlayerObject(player);
        const BB_player = await createPlayerObject(B_player);
        let msg = await player_zhandou(A_player, BB_player);
        let name = await determineWinner(msg.result, player.name, B_player.name);
        let temp = msg.result;
        if (name === player.name) {
          const money = player.金钱 * 0.9;
          temp.push(`打劫成功,获得${money}`);
          player.金钱 += money;
          B_player.金钱 -= money;
        }
        player.当前生命 -= Number(msg.B_damage);
        player.当前生命 -= Number(msg.A_damage);
        await Write_player(usr_qq,player,false,false,false);
        await Write_player(String(B_id),player,false,false,false);
        let get_data = { temp };
        await pic(e, get_data, `get_msg`);
        return false;
      }
      async at(e:AMessage):Promise<boolean>{
        const at = e.at_user
        console.log(at);
        if(!at) return false;
        e.reply(at.id)
        return false;
      }
      async bidou(e:AMessage):Promise<boolean> {
        const usr_qq = e.user_id;
        if (!await existplayer(1, usr_qq)) return false;
        let B_player_results:any = await getB_qq(e, "player");
        let B_player = B_player_results.player;
        let B_id = await getB_qq(e, "id");
        if (!B_player || !B_id) return false;
        let results = await Read_player(1,usr_qq)
        let player = results.player;
        if (player.当前生命 < 50) return e.reply(`先去治疗吧`);
        const A_player = await createPlayerObject(player);
        const BB_player = await createPlayerObject(B_player);
        let msg = await player_zhandou(A_player, BB_player);
        let name = await determineWinner(msg.result, player.name, B_player.name);
        let temp = msg.result;
        console.log(temp);
        player.灵气 += 50;
        player.体魄力量 += 100;
        B_player.灵气 += 50;
        B_player.体魄力量 += 100;
        B_player.当前生命 -= Number(msg.B_damage);
        player.当前生命 -= Number(msg.A_damage);
        await Write_player(usr_qq,player,false,false,false);
        await Write_player(String(B_id),player,false,false,false);
        let get_data = { temp };
        await pic(e, get_data, `get_msg`);
        return false;
      }
      
     


}
 