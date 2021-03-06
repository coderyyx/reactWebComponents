import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from './components/table/index.js';
// import Select,{Option} from './components/rc-select/index.js';
import PullSelect from './components/pullSelect/index.js';

import Anima from './components/specialSelect/index';

const Option = PullSelect.Option;
require('./components/style/index.css');
import './components/style/select.less';
// class Root extends Component {
//     constructor (props, context) {
//         super(props, context)
//         this.state={};
//         this.ondbclick=this.ondbclick.bind(this);
//     }
//     ondbclick(row){
//         console.log(row);
        
//     }
//     render () {
//         let dataSource=[{key:"1",name:'yyx',age:'24',sex:'M'},{key:"2",name:'yyx2',age:'21',sex:'W'},{key:"3",name:'yyx3',age:'24',sex:'M'}];
//         let columns=[
//             {
//                 title:'name',
//                 dataIndex:'name',
//                 width:'40',
//                 render:(text,row,index)=>{
//                     return text+"zzz";
//                 }
//             },
//             {
//                 title:'age',
//                 dataIndex:'age',
//                 width:'30'
//             },
//             {
//                 title:'sex',
//                 dataIndex:'sex',
//                 width:'40'
//             }
//         ]
//         let rowSelection ={
//             onChange: (selectedRowKeys, selectedRows) => {
//                 console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//             }
//         }
//         return (
//             <div>
//                 <Table dataSource={dataSource} columns={columns} ondbclick={this.ondbclick} rowSelection={rowSelection}/>
//             </div>
//         )
//     }
// }


class Root extends Component {
    onChange(value){
        console.log(value)
    }
    
    render () {
        let pullSelect_props={
            value:"杨运心",
            onChange:(value)=>this.onChange(value),
            conHeight:30,
            noReturn:false,
            defautText:'其它操作...'
        }
        return (
            <div>
                <PullSelect {...pullSelect_props}>
                    <Option eq="1" value="1">y</Option>
                    <Option eq="2" value="2">x</Option>
                    <Option eq="3" value="3">biosan</Option>
                    <Option eq="4" value="4">bebeanan</Option>
                </PullSelect>
                
            </div>
        )
    }
}

// class Root extends Component {
//     onChange(value){
//         console.log(value)
//     }
    
//     render () {
//         let pullSelect_props={
//             value:"杨运心",
//             onChange:(value)=>this.onChange(value),
//             conHeight:30,
//             noReturn:false,
//             defautText:'其它操作...'
//         }
//         return (
//             <div style={{width:'100px'}}>
//                 <Select style={{width:'100%'}}>
//                     <Option value="1">1</Option>
//                     <Option value="2">2</Option>
//                 </Select>
//             </div>
//         )
//     }
// }

ReactDOM.render(<Root/>,document.getElementById('root'));