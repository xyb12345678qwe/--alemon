import { existplayer,Read_player,Write_player,Write_playerData,getlingqi,isNotNull,pic ,findIndexByName,Strand,getNonZeroKeys,startstatus,stopstatus,gettupo,getstring,checkZeroValue,checkAllZeroValues,
    checkNameExists,player_zhanli,Add_bag_thing, player_zhandou,determineWinner,getB_qq,createPlayerObject,Write_list,getCurrentTime,_item} from "../../model/wuzhe.js";
import { plugin,AMessage } from "../../app-config.js";
export class jisha extends plugin {
	constructor() {
		super({
			/** 功能名称 */
			name: 'jisha',
			/** 功能描述 */
			dsc: '基础模块',
			event: 'message',
			/** 优先级，数字越小等级越高 */
			priority: 600,
			rule: [
				{
					reg: /^(#|\/)妖兽地点$/,
					fnc: 'x',
                },
                {
					reg: /^(#|\/)探索.*$/,
					fnc: 'xx',
                },
                {
					reg: /^(#|\/)击杀.*$/,
					fnc: 'xxx',
                },
			],
		});
	}
    async x(e:AMessage):Promise<boolean>{
        let item = await _item(1,`妖兽地点`);
        let get_data={item};
        await pic(e,get_data,`get_jisha`);
        return false;
    }
    async xx(e:AMessage):Promise<boolean>{
        const now: number = Date.now();
        const usr_qq: string = e.user_id;
        if (!await existplayer(1, usr_qq, 'player')) return false;
        const name: string = e.msg.replace(/(\/|#)探索/, "").trim();
        const x: any = await _item(1,`妖兽地点`);
        let item: any = x.find((team: any) => team.name === name);
        if (!item) return false;
        let msg: string[] = [];
        for (let i = 0; i < item.妖兽.length; i++) {
            if (item.time === 0 || await getCurrentTime(item.time, 60 * 24)) {
                const randomValue: number = Math.floor(Math.random() * 1001); // 生成0到1000之间的随机整数
                console.log(randomValue);
                item.妖兽[i].数量 = randomValue;
            }
            msg.push(`${item.妖兽[i].name}: ${item.妖兽[i].数量}只`);
        }
        item.time = now;
        await Write_list(x, "妖兽地点");
        return e.reply(msg.join('\n'));
    }
    async xxx(e:AMessage):Promise<boolean>{
        const usr_qq: string = e.user_id;
        if (!await existplayer(1, usr_qq, 'player')) return false;

        const name: string = e.msg.replace(/(\/|#)击杀/, "").trim();
        const [adress, boss, num] = name.split("*").map(code => code.trim());

        const x: any = await _item(1, '妖兽地点');
        const item: any = x.find((team: any) => team.name === adress);
        console.log(item);
        
        if (!item) return false;

        let xx: any = await _item(1, '妖兽列表');
        xx = xx.find((item: any) => item.name === boss);
        console.log(xx);
        
        if (!xx) return false;

        let xxx: any = item.妖兽.find((team: any) => team.name === boss);
        console.log(xxx);
        if (xxx.数量 < parseInt(num)) return e.reply(`数量不足`);
        if (!xxx) return false;

        let player: any = await Read_player(1, usr_qq, "player");
        if (player.当前生命 < 50) return e.reply(`先去治疗吧`);

        const A_player: any = {
            name: player.name,
            暴击加成: player.暴击加成,
            爆伤加成: player.爆伤加成,
            攻击加成: player.攻击加成,
            闪避加成: player.闪避加成,
            防御加成: player.防御加成,
            当前生命: player.当前生命,
        };

        const B_player: any = {
            name: xx.name,
            暴击加成: xx.暴击加成,
            爆伤加成: xx.爆伤加成,
            攻击加成: xx.攻击加成,
            闪避加成: xx.闪避加成,
            防御加成: xx.防御加成,
            当前生命: xx.生命加成,
        };

        const AA_player: any = { ...player, 当前生命: player.当前生命 };
        const BB_player: any = { ...xx, 当前生命: xx.生命加成 };

        console.log(AA_player);
        console.log(BB_player);

        const msg: any = await player_zhandou(A_player, B_player);
        const temp: any = msg.result;

        const sheng_name = await determineWinner(temp, player.name, B_player.name);
        if (sheng_name === player.name) {
            player.灵气 += xx.掉落修为;
            player.体魄力量 += xx.掉落体魄力量;
            player.钱财 += xx.掉落钱财;
            temp.push(`恭喜你打赢了${xx.name}，获得灵气${xx.掉落修为}，获得体魄力量${xx.掉落体魄力量}，获得钱财${xx.掉落钱财}`);
        }

        player.当前生命 -= msg.A_damage;
        xxx -= parseInt(num);

        await Write_playerData(usr_qq, player, "无", "无", "无", x, "妖兽地点");
        const get_data: any = { temp };
        await pic(e, get_data, `get_msg`);

        return e.reply(`失败`);
    }

}