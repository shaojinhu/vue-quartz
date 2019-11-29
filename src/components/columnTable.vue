<template>
<!-- 公共的组件table -->
    <div>
        <el-table
                :data="tableData"
                :border="true"
                :highlight-current-row="true"
                style="width: 100%"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                @row-click="rowClick">
                <!-- 平常的字段 -->
                <template v-for="(col,index) in columns" >
                    <!-- 不使用插槽域 -->
                    <el-table-column 
                        v-if="!col.slot"
                        :key="index"
                        :type="col.type || null" 
                        :label="col.label || null"
                        :prop="col.prop || null"
                        :width="col.width"
                        :align="col.align || 'left'"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    <!-- 使用插槽域 -->
                    <el-table-column 
                        v-if="col.slot == true"
                        :key="index"
                        :type="col.type || null" 
                        :label="col.label || null"
                        :prop="col.prop || null"
                        :width="col.width"
                        :align="col.align || 'left'"
                        :show-overflow-tooltip="true">
                        <template v-if="col.slot" slot-scope="scope">
                            <el-tag
                                effect="dark"
                                :type="scope.row[col.prop] === 0 ? 'success' : 'danger'"
                                disable-transitions
                                size="medium">
                                    {{ scope.row[col.prop] === 0 ? '是' : '否' }}
                                </el-tag>
                        </template>
                    </el-table-column>
                </template>
                <!-- 按钮部分 -->
                <template v-if="isHide">
                    <el-table-column
                        align="center">
                        <template slot="header">
                            <span>操作</span>
                        </template>
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="warning"
                            icon="el-icon-edit"
                            @click="Edit(scope.$index, scope.row)">修改</el-button>
                            <el-button
                            size="mini"
                            type="success"
                            icon="el-icon-delete"
                            @click="Delete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </template>
                
        </el-table>
    </div>
</template>

<script>

export default {
    name:"columnTable",
    props:{
        columns:{
            type:Array,
            default:[]
        },
        tableData:{
            type:Array,
            default:[]
        },
        loading:{
            type:Boolean,
            default:true,
        },
        isHide:{
            type:Boolean,
            default:false
        },
        handleEdit:{
            type:Function,
            default:function(){return false}
        },
        handleDelete:{
            type:Function,
            default:function(){return false}
        },
        handlerowClick:{
            type:Function,
            default:function(){return false}
        }
    },
    data(){
        return {

        }
    },
    methods:{
        //编辑
        Edit(rowi,row){
            this.handleEdit(rowi,row);
        },
        //删除
        Delete(rowi,row){
            this.handleDelete(rowi,row);
        },
        //当点击当前行
        rowClick(row,column,event){
            this.handlerowClick(row,column,event)
        },
        defaultFunction(){
            return false;
        }
    },
    
}
</script>

<style scoped>

</style>