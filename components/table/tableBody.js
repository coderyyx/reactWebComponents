import React, { Component } from 'react'
import Columns from './columns.js';//thead
/*
    render datasource
    设置td宽度=》根据对应column的宽度
    render tr

*/  

const noop = () => {

}

const getTdWidth = (name,columns)=> {
    /*
        params:
            name
            columns
    */
    let width='30';
    if(!columns || columns.length==0)
        return width;

    for(let i=0;i<columns.length;i++){
        if(columns[i].dataIndex==name){
            return columns[i].width?columns[i].width:width;
        }    
    }
    return width;
}

const getTdContainer= (text,row,index,item) => {
    let render=item.render?item.render:null;
    if(render && typeof render=='function')
        return render(text,row,index);
    else
        return text;
        
}

const getColumn = (columns,columnName) => {
    if(columnName=='key')
        return null;
    for(let i=0;i<columns.length;i++){
        if(columns[i].dataIndex==columnName)
            return columns[i];
    }
    return null;
}

class TableBody extends Component {
    constructor (props, context) {
        super(props, context)
        this.state={
            selectedRows:[]
        }
        
    }
    removeItem(selectedRows,item){
        for(let i=0;i<selectedRows.length;i++){
            if(selectedRows[i].key==item.key){
                selectedRows.splice(i,1);
                return selectedRows;
            }
                
        }
        return selectedRows;
    }
    onClickCheckBox(e,item){
        e.stopPropagation();
        let checked=e.target.checked;
        let {rowSelection} = this.props;
        rowSelection=rowSelection?rowSelection:noop;
        if(checked){
            this.state.selectedRows.push(item);
        }else{
            this.state.selectedRows=this.removeItem(this.state.selectedRows,item);
        }
        this.setState(this.state);
        rowSelection.onChange(this.state.selectedRows);
    }
    renderTd(dataSourceRow,index){
        let {columns,rowSelection}=this.props;
        let arr=[];
        let i=0;
        if(rowSelection)
            arr.push(<td style={{width:'30px'}} key={"rowSelection"}><input type="checkbox" onClick={(e)=>this.onClickCheckBox(e,dataSourceRow)}/></td>);

        for(let item in dataSourceRow){
            let width=getTdWidth(item,columns);
            let column=getColumn(columns,item);
            if(column!=null){
                let _td=<td style={{width:width+'px'}} key={i}>{getTdContainer(dataSourceRow[item],dataSourceRow,index,column)}</td>
                arr.push(_td);
            }
            
            i++;
        }
        return arr;
    }
    dbclick(e,row){
        e.stopPropagation();
        this.props.ondbclick(row);
    }
    renderTableBody(){
        let {columns,dataSource,ondbclick}=this.props;
        ondbclick=ondbclick?ondbclick:noop;
        if(!dataSource || dataSource.length==0)
            return null;
        let tBody=dataSource.map((item,index)=>{
            return <tr key={index}
                        onDoubleClick={(e)=>this.dbclick(e,item)}
                        >
                        {this.renderTd(item,index)}
                   </tr>
        })
        return tBody;
    }
    render () {
        let {columns,rowSelection}=this.props;
        return (
            <div>
                    <Columns columns={columns} rowSelection={rowSelection}/>
                    <div>
                        <table className="y-table">
                            
                            
                                <tbody className="y-tbody">
                                    {this.renderTableBody()}
                                </tbody>
                            
                        </table>
                    </div>
            </div>
        )
    }
}

export default TableBody;