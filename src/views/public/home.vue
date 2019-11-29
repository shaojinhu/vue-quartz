<template>
    <div style="padding-top:100px;">
        <el-card class="box-card" style="height:500px;width:1500px;margin:0 auto;">
        
        <el-row style="height:40px;line-height:40px;margin-bottom:5px;">
            <el-col :span="5"><span>任务名称:&nbsp;&nbsp;&nbsp;</span><el-input size="small" placeholder="请输入内容" v-model="param.jobName" clearable style="width:220px;"> </el-input></el-col>
            <el-col :span="7">
                <el-button
                    size="small"
                    type="primary"
                    icon="el-icon-search"
                    @click="handleSearch">搜索</el-button>
                    <el-button
                    size="small"
                    type="success"
                    icon="el-icon-circle-plus-outline"
                    @click="handleAdd">添加</el-button>
            </el-col>
        </el-row>
        
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <!-- 任务名称 -->
            <el-table-column label="任务名称" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-eleme"></i>
                    <span style="margin-left: 10px">{{ scope.row.jobName }}</span>
                </template>
            </el-table-column>
            <!-- 任务组 -->
            <el-table-column
                prop="jobGroup"
                label="任务分组"
                width="180">
            </el-table-column>
            <!-- cron表达式 -->
            <el-table-column
                label="cron表达式"
                width="180">
                <template slot-scope="scope">
                    <el-tag :type="success" effect="plain">{{scope.row.cronExpression}}</el-tag>
                </template>
            </el-table-column>
            <!-- 任务状态 -->
            <el-table-column
                prop="triggerState"
                label="任务状态(触发器状态)"
                width="180">
            </el-table-column>
            <!-- 任务描述 -->
            <el-table-column
                prop="description"
                label="任务描述"
                width="210"
                show-overflow-tooltip>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    icon="el-icon-check"
                    @click="handleStart(scope.row)">开始</el-button>
                    <el-button
                    size="mini"
                    type="warning"
                    icon="el-icon-video-pause"
                    @click="handleStop(scope.row)">暂停</el-button>
                    <el-button
                    size="mini"
                    type="success"
                    icon="el-icon-refresh"
                    @click="handleRegain(scope.row)">恢复</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-close"
                    @click="handleDelete(scope.row)">结束</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="param.total"
            @current-change="currentChange">
        </el-pagination>
        </el-card>

        <Add ref="Add"></Add>
    </div>
</template>
<script>
import { getClassList,getJobList,checkJob,startJob,stopJob,regainJob,removeJob } from "@/api/public/quartz.js"
export default {
    name:"home",
    data(){
        return{
            tableData:[],
            param:{page:1,size:10,total:0}
        }
    },
    methods:{
        //开始任务
        handleStart(data){
            startJob(data).then(res=>{
                if(res.data.code == 200){
                    this.$message({message:res.data.msg,type:"success"});
                    this.getJob();
                }else{
                    this.$message({message:res.data.msg,type:"error"})
                }
            })
        },
        //暂停任务
        handleStop(data){
            stopJob(data).then(res=>{
                if(res.data.code == 200){
                    this.$message({message:res.data.msg,type:"success"});
                    this.getJob();
                }else{
                    this.$message({message:res.data.msg,type:"error"})
                }
            })
        },
        //恢复任务
        handleRegain(data){
            regainJob(data).then(res=>{
                if(res.data.code == 200){
                    this.$message({message:res.data.msg,type:"success"});
                    this.getJob();
                }else{
                    this.$message({message:res.data.msg,type:"error"})
                }
            })
        },
        handleSearch(){
            this.getJob();
            if(this.tableData.length >0){
                this.$message({message:"搜索完成",type:"success"})
            }else{
                this.$message({message:"搜索为空",type:"warning"})
            }
        },
        handleAdd(){
            this.$refs.Add.dialogFormVisible = true;
        },
        //页容量发生变化时
        sizeChange(pageSize){
            this.param.size = pageSize;
        },
        //移除任务
        handleDelete(data){
            removeJob(data).then(res=>{
                if(res.data.code == 200){
                    this.$message({message:res.data.msg,type:"success"});
                    this.getJob();
                }else{
                    this.$message({message:res.data.msg,type:"error"})
                }
            })
        },
        //页码发生改变时
        currentChange(page){
            this.param.page = page;
            this.getJob();
        },
        //获得任务列表
        getJob(){
            getJobList(this.param).then(res=>{
                if(res.data != null){
                    console.log(res);
                    this.tableData = res.data.rows;
                    this.param.total = res.data.total;
                }
            });
        }
    },
    created(){
        this.getJob();
    },
    components:{
        Add:()=>import("@/views/public/Add.vue")
    }
}
</script>
<style scoped>
    .box-card{
        height:200px;
    }
</style>