import React, { Component } from 'react'
/*
    columns
    dataSource
*/
import  style from './index.css';

class Columns extends Component {
    constructor (props, context) {
        super(props, context)
        
    }
    setThead(){
        let {columns,rowSelection}=this.props;
        let arr=[];
        if(!columns || columns==null)
            return null;

        if(rowSelection){
            arr.push(<th key='rowSelection' style={{width:'30px'}}><input type="checkbox"/></th>);
        }

        for(let i=0;i<columns.length;i++){
            let item=columns[i];
            let width=item.width?item.width:'30';
            arr.push(<th key={item.dataIndex} style={{width:width+'px'}}><span>{item.title}</span></th>);  
        }
        
        return arr;
    }
    render () {
        return (
            <div className={style.col1}>
                <table className="column-tb">
                    <thead className="y-thead">
                        <tr>
                            {this.setThead()}
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
}

export default Columns;