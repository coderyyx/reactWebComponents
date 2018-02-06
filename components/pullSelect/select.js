import React, { Component } from 'react'

import {Motion, spring} from 'react-motion';

const classNames = require('classnames');

const noop = () => {}

const styles = {
    menu: {
      overflow: 'hidden',
      border: '2px solid #ddd',
      width: 300,
      position: 'absolute'
    },
    selection: {
      padding: 10,
      margin: 0,
      borderBottom: '1px solid #ededed'
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      cursor: 'pointer',
      width: 200,
      height: 45,
      border: 'none',
      borderRadius: 4,
      backgroundColor: '#ffc107',
    },
}

class PullSelect extends Component {
    constructor (props, context) {
        super(props, context)
        this.state={
            pullTop:true,
            pullType:true,
            value:'',
            text:'',
            height:38
        }
    }
    componentWillReceiveProps(nextProps){

    }
    animate = () => {
        let length = this.props.children.length;
        let top = 38*length + styles.selection.padding*length;
        this.setState((state) => ({ height: state.height === 38 ? top : 38,pullType:!state.pullType }))
    }
    click(event){
        event = event || window.event;
        let {onChange,noReturn,onSelect} = this.props;
        let {nodeName,value,innerText}=event.target;
        nodeName = nodeName.toLowerCase();
        onChange = onChange ? onChange : noop;
        onSelect = onSelect ? onSelect : noop;
        if(nodeName === 'div'){
            this.animate();
        }else if(nodeName === 'li'){
            /**
             * 是否回填默认值
             */
            if(noReturn){
                onSelect();
                //收回下拉
                this.animate();
                //
                return;
            }
            //回填 && 两次选中不一样
            if(value!=this.state.value){
                onChange(value);
                onSelect(value);
                //收回下拉
                this.animate();
                //回填描述
                this.setState({value:value,text:innerText});
            }else{
                onSelect(value);
                this.animate();
                return;
            }
                
        }
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

        let warpClass = classNames("special-warp",
            { "arrow-up": pullType ,
            "arrow-down":!pullType }
        )
        return (
            <div className={warpClass} 
                 onClick={(e)=>this.click(e)}>
                <Motion style={{ height: spring(this.state.height) }} >
                {
                    ({ height }) => <div style={Object.assign({}, styles.menu, { height } )}>
                        {this.props.children}
                  </div>
                }
                </Motion>
            </div>
        )
    }
}

export default PullSelect ;