import {plugin,AMessage,Show,puppeteer,existplayer,Read_player,Write_player,Write_playerData,getlingqi ,findIndexByName,Strand,_item,pic,Read_yaml,extractAttributesWithPropertyOne, Add_bag_thing,oImages, Read_json} from '../../api'

export class show extends plugin {
	constructor() {
		super({
			/** 功能名称 */
			name: 'show',
			/** 功能描述 */
			dsc: '基础模块',
			event: 'message',
			/** 优先级，数字越小等级越高 */
			priority: 600,
			rule: [
            {
			    reg: /^(#|\/)?万界堂$/,
			    fnc: 'wanjietang',
		    },
			{
			    reg: /^(#|\/)?购买.*$/,
			    fnc: 'buy',
		    },
			{
			    reg: /^(#|\/)?我的背包$/,
			    fnc: 'bag',
		    },
			],
		});
	}
	async bag(e:AMessage):Promise<boolean>{
		const usr_qq = e.user_id;
		if (!await existplayer(1, usr_qq, 'player')) return false;
		let player = await Read_player(1,true, usr_qq, "player");
		let strand_hp= await Strand(player.当前生命, player.生命上限);
		let bag = await Read_player(1,true, usr_qq, "bag");
		let temp:any={
			name: player.name,
			宣言: player.宣言,
			player: player,
			strand_hp,
			bag
		};
		const img = await oImages('/resources/html/bag/bag.html',temp)
		if(img) e.reply(img)
		return true;
	}
	async buy(e:AMessage):Promise<boolean>{
		const usr_qq = e.user_id;
		const name: string = e.msg.replace(/(\/|#)购买/, "").trim();
		let [adress, thing_name, num] = name.split("*").map(code => code.trim());
		if(adress !== "万界堂") return e.reply('没有这个商店');
		const x = await wanjietang_thing()
		const thing = x.find(item =>item.name === thing_name)
		if(!thing)return e.reply(`没有这个物品`);
		const money = thing.售价 * Number(num);
		let player = await Read_player(1,true,usr_qq,"player")
		if(player.金钱 < money)return e.reply(`金钱不够`)
		player.金钱 - money;
		e.reply(`购买成功`)
		await Add_bag_thing(usr_qq,thing_name,Number(num),thing)
		await Write_player(1,true,usr_qq,player,"player")
		return true;
	}
    async wanjietang(e:AMessage):Promise<boolean>{
        const combinedArray = await wanjietang_thing()
        let temp = {x:combinedArray}
		const img = await oImages('/resources/html/wanjietang/wanjietang.html',temp)
		if(img) e.reply(img)
        return false;
    }
}
export async function wanjietang_thing(){
	const [items, skills] = await Promise.all([
		Read_json(3, "/item/道具列表.json"),
		Read_json(3, "/item/功法列表.json")
	]);
	const [x, xx] = await Promise.all([
		await extractAttributesWithPropertyOne(items),
		await extractAttributesWithPropertyOne(skills)
	]);
	const combinedArray:any[] = x.concat(xx);
	return combinedArray
}