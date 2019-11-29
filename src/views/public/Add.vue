<template>
    <div>
        <el-dialog title="添加任务" :visible.sync="dialogFormVisible" @close="()=>{this.isok = true;
        this.isoktwo = false}" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <el-form :model="form" label-width="100px" >

                <el-form-item label="任务名称">
                    <el-input v-model="form.jobName" style="width:90%;"></el-input>
                </el-form-item>

                <el-form-item label="任务分组">
                    <el-input v-model="form.jobGroup" style="width:90%;"></el-input>
                </el-form-item>

                <el-form-item label="执行类">
                    <el-select v-model="form.jobClassName" placeholder="请选择触发器" style="width:90%;">
                        <el-option
                            v-for="item in classlist"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="CRON分组">
                    <el-input placeholder="请输入内容" v-model="form.cronExpression" style="width:90%;">
                        <template slot="append"><a href="http://cron.qqe2.com/">cron表达式</a></template>
                    </el-input>
                </el-form-item>


                <el-form-item label="任务描述">
                    <el-input placeholder="请输入内容" v-model="form.description" style="width:90%;">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false;">取消</el-button>
                <el-button @click="CheckJob" type="warning" :disabled="isoktwo">校验任务</el-button>
                <el-button type="primary" @click="handleSubmit" :disabled="isok">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getClassList,addJob,checkJob } from "@/api/public/quartz.js"
export default {
    name:"add",
    data(){
        return{
            form:{},
            dialogFormVisible:false,
            classlist:[],
            formLabelWidth:"230",
            isok:true,
            isoktwo:false
        }
    },
    methods:{
        getClessList(){
            getClassList(null).then(res=>{
                if(res.data != null){
                    this.classlist = res.data;
                }
            })
        },
        //检测任务是否存在
        CheckJob(){
            //检查任务是否存在
            checkJob(this.form).then(res=>{
                if(res.data.code == 200){
                    this.$message({message:res.data.msg,type:"success"})
                    this.isok = false;
                    this.isoktwo = true;
                    console.log(res);
                }else{
                    this.$message({message:res.data.msg,type:"error"})
                }
            })
        },
        //提交表单
        handleSubmit(){
            addJob(this.form).then(res=>{
                if(res.data.code = 200){
                    this.$message({message:res.data.msg,type:"success"})
                    this.dialogFormVisible = false;
                    this.$parent.getJob(this.$parent.param);
                }else{
                    this.$message({message:res.data.msg,type:"error"})
                }
            })
        }
    },
    created(){
        this.getClessList();
        this.isok = true;
        this.isoktwo = false;
    }
}
</script>
<style scoped>


</style>