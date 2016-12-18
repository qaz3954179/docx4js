import JSZip from 'jszip'
import cheer from "cheerio"
import {Parser, DomHandler} from "htmlparser2"
let uuid=0
/**
 *  document parser
 *
 *  @example
 *  Document.load(file)
 *  	.then(doc=>doc.parse())
 */
export default class{
	constructor(parts,raw,props){
		this.parts=parts
		this.raw=raw
		this.props=props
	}

	getPart(name){
		return this.parts[name]
	}

	getBufferPart(name){
		var part=this.parts[name]
		var crc32=part._data.crc32
		var buffer=part.asNodeBuffer()
		buffer.crc32=part._data.crc32=crc32
		return buffer
	}

	getObjectPart(name){
		const part=this.parts[name]
		if(!part)
			return null
		else if(part.cheerio)
			return part
		else{
			try{
				let opt={xmlMode:true}
				let handler=new DomHandler(opt,el=>el.id=uuid++)
				new Parser(handler,opt).end(part.asText())
				return this.parts[name]=cheer.load(handler.dom,{xmlMode:true})
			}catch(error){
				console.error(error)
				return null
			}
		}
	}

	parser(){

	}

	render(){

	}

	/**
	 *  a helper to load document file

	 *  @param inputFile {File} - a html input file, or nodejs file
	 *  @return {Promise}
	 */

	static load(inputFile){
		var DocumentSelf=this
		return new Promise((resolve, reject)=>{
			function parse(data, props={}){
				var raw=new JSZip(data),parts={}
				raw.filter((path,file)=>parts[path]=file)
				resolve(new DocumentSelf(parts,raw,props))
			}

			if(typeof inputFile=='string'){//file name
				require('fs').readFile(inputFile,function(error, data){
					if(error)
						reject(error);
					else if(data){
						parse(data, {name:inputFile.split(/[\/\\]/).pop().replace(/\.docx$/i,'')})
					}
				})
			}else if(inputFile instanceof Blob){
				var reader=new FileReader();
				reader.onload=function(e){
					parse(e.target.result, {
							name:inputFile.name.replace(/\.docx$/i,''),
							lastModified:inputFile.lastModified,
							size:inputFile.size
						})
				}
				reader.readAsArrayBuffer(inputFile);
			}else {
				parse(inputFile)
			}
		})
	}
}
