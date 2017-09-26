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
            value:'',
            text:''
        }
    }
    componentWillReceiveProps(nextProps){

    }
    click(event){
        event = event || window.event;
        let {onChange} = this.props;
        let {nodeName,value,innerText}=event.target;
        nodeName = nodeName.toLowerCase();
        if(nodeName == 'div'){
            this.pullUp();
        }else if(nodeName == 'li'){
            if(value!=this.state.value){//触发onChange
                onChange(value);
                //收回下拉
                this.pullUp();
                //回填描述
                this.setState({value:value,text:innerText});
            }
                
        }
    }
    pullUp(){
        this.setState({pullTop:!this.state.pullTop});
    }
    getPullTop(conHeight,numbers,pullTop){
        //下拉高度大于500
        if(conHeight*numbers>500)
            return 500;
        return pullTop ? (-conHeight*numbers+'px') : (conHeight+'px');
    }
    render () {
        let {pullTop,text} = this.state;
        let {value,defaultValue,conBoderColor,conTextColor,conHeight,conIconColor,dropSpeed,top ,onChange} = this.props;
        conTextColor = conTextColor ?   conTextColor : 'green'; 
        conBoderColor = conBoderColor ?   conBoderColor : 'green'; 
        conHeight = conHeight ?   conHeight : '20'; 
        dropSpeed = dropSpeed ?   dropSpeed : '1s'; 
        // value = value || defaultValue ;
        value = text;
        let length = this.props.children ? this.props.children.length : 1;
        //设置滚动高度\/top
        top = this.getPullTop(conHeight,length,pullTop);
        
        let child_props = {
            child:this.props.children
        }

        return (
            <div className="y-con" style={{color:conTextColor,border:'1px solid '+conBoderColor}} onClick={(e)=>this.click(e)}>
                {value}
                <ul className="y-uls" style={{transition:'top ' + dropSpeed,top:top}}>
                    {this.props.children}
                </ul>
            </div>
        )
    }
}

export default PullSelect ;