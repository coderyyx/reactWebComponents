import React, { Component } from 'react'
// import Option from './options.js';


const noop = () => {}


class Child extends Component {
    render () {
        let {child} = this.props;
        return (
            <ul>
                {child}
            </ul>
        )
    }
}



class PullSelect extends Component {
    constructor (props, context) {
        super(props, context)
        this.state={
            pullTop:true,
            pullType:true,
            value:'',
            text:''
        }
    }
    componentWillReceiveProps(nextProps){

    }
    click(event){
        event = event || window.event;
        let {onChange,noReturn,onSelect} = this.props;
        let {nodeName,value,innerText}=event.target;
        nodeName = nodeName.toLowerCase();
        if(nodeName === 'div'){
            this.pullUp();
        }else if(nodeName === 'li'){
            /**
             * 是否回填默认值
             */
            if(noReturn){
                onSelect ? onSelect(value) : noop();
                //收回下拉
                this.pullUp();
                //
                return;
            }
                //触发onChange
            if(value!=this.state.value){
                onChange(value);
                //收回下拉
                this.pullUp();
                //回填描述
                this.setState({value:value,text:innerText});
            }
                
        }
    }
    pullUp(){
        let ms = this.state.pullType ? 450 : 200;
        console.log(ms)
        setTimeout(()=>{
            this.setState({pullType:!this.state.pullType});
        },ms)
        this.setState({pullTop:!this.state.pullTop});
    }
    getPullTop(conHeight,numbers,pullTop){
        //下拉高度大于500
        if(conHeight*numbers>500)
            return 500;
        //4px 的距离 可做成可配置
        return pullTop ? (-conHeight*numbers+'px') : (conHeight+4+'px');
    }
    render () {
        let {pullTop,pullType, text} = this.state;
        let {value,defaultValue,defautText,conBoderColor,conTextColor,conHeight,
            conIconColor,dropSpeed,top ,onChange,onSelect,noReturn,disabled,
        pullTextColor,pullBorderColor,iconColor,fontSize} = this.props;
        
        conTextColor = conTextColor ?   conTextColor : 'green'; 
        conBoderColor = conBoderColor ?   conBoderColor : 'green'; 
        //容器高度
        conHeight = conHeight ?   conHeight : '20';
        //下拉框移动速度 
        dropSpeed = dropSpeed ?   dropSpeed : '1s'; 
        /**
         * 默认文案
         */
        value = defautText ? defautText : text;
        pullTextColor = pullTextColor ? pullTextColor : 'green';
        pullBorderColor = pullBorderColor ? pullBorderColor : 'gray';
        let overflow  = pullTop ? 'hidden' : 'initial';
        let length = this.props.children ? this.props.children.length : 1;
        
        //设置滚动高度
        top = this.getPullTop(conHeight,length,pullTop);
        iconColor = iconColor ? iconColor :'#3da5e7';
        fontSize = fontSize ? fontSize : '14px';

        let child_props = {
            child:this.props.children
        }

        let pullStyle = {
            transition:'top ' + dropSpeed,
            top:top,
            overflowY:top==500?'scroll':'initial',
            color:pullTextColor,
            border:'1px solid ' + pullBorderColor
        }

        let yConStyle = {
            color:conTextColor,
            border:'1px solid '+ conBoderColor,
            height:conHeight-2+'px',
            lineHeight:conHeight+'px',
            overflow:overflow
        }

        let iconStyle = {
            borderBottom:pullTop ? 'none' : ('8px solid ' + iconColor),
            borderTop:pullTop ? ('8px solid ' + iconColor) : 'none'
        }
        return (
            <div className="container" 
                 style={{overflow:pullType ? 'hidden':'initial'}}
                 onClick={(e)=>this.click(e)}>
                <div className="y-con" 
                    style={yConStyle} 
                    ref="con">
                    <div className="defaultText" style={{fontSize:fontSize}}>{value}</div>
                    <div className={`triangle-${pullTop?'down':'up'}`} style={iconStyle}></div>
                    
                </div>
                <ul className="y-uls" 
                    style={pullStyle}>
                        {this.props.children}
                </ul>
            </div>
        )
    }
}

export default PullSelect ;