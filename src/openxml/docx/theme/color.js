var RGB=/([a-fA-F0-9]{2}?){3}?/;
export default class color {
	constructor(wXml, xMapping){
		this.wXml=wXml
		this.map={}
		for(var i=0,map=xMapping.attributes,len=map.length, attr;i<len;i++)
			this.map[(attr=xMapping.attributes[i]).localName]=attr.value
	}
	get(name, t){
		if(name=='phClr')//placeholder color, witch will be replaced with direct style
			return name
		name=this.map[name]||name
		if(t=this.wXml.$1(name)){
			switch(t.firstChild.localName){
			case 'sysClr':
				return '#'+t.firstChild.attr('lastClr')
			default:
				return '#'+t.firstChild.attr('val')
			}
		} else
			return '#eee' // 不确定字体颜色和背景色是不是都用这个默认值，给一个中间色防止出现意外。
	}
}
