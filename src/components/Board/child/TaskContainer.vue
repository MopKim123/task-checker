<template>
    <!-- Backdrop always rendered --> 
    <div class="task-container">
        <div class="task-top">
            <h2>{{ boardStore.current?.name }}</h2>
        </div>
        <div class="tasks">
            <div 
                class="task-card"
                v-for="task in taskStore.tasks"
                :key="task.id"
                @click="selectTask(task)"
            >
                
                <div class="task-card-row">
                    <h3>{{ task.title }}</h3>
                    <span class="status" :class="task?.status === 'URGENT' ? 'urgent' : 'normal'">{{ task.status }}</span>
                </div>
                <p>{{ task.description }}</p>
                <div class="task-card-row bottom">
                    <p>Assigned to:</p>
                    <p><u>{{ task.assignedTo.username }}</u></p>
                </div>
                <div class="task-card-bottom">
                    <div class="task-card-comment">
                        <p>{{ taskStore.comments.filter(c => c.task?.id == task.id).length }}</p>
                        <img src="../../../assets/comment.png" class="icon" />
                    </div>
                    <div class="task-btn">
                        <img src="../../../assets/edit.png" class="icon" @click.stop="editTask(task)" title="Edit Task"/>
                        <img src="../../../assets/bin.png" class="icon" @click.stop="deleteTask(task)" title="Delete Task"/>
                    </div>
                </div>
            </div>
            <div class="create-task-card" @click="isCreateTaskVisible = true" v-show="boardStore.current.id"> 
                <img src="../../../assets/plus.png" class="icon" />
            </div>
        </div>
 
    </div> 

    <CreateTask  
        :visible="isCreateTaskVisible"  
        @update=""
        @close="isCreateTaskVisible = false"
    />
    <ViewTask 
        :selectedTask="selectedTask"  
        :visible="isViewTaskVisible"  
        @update=""
        @close="isViewTaskVisible = false"
    />
    <EditTask 
        :selectedTask="selectedTask"  
        :visible="isEditTaskVisible"  
        @update=""
        @close="isEditTaskVisible = false"
    />
    <DeleteTask
        :selectedTask="selectedTask"  
        :visible="isDeleteTaskVisible"  
        @update=""
        @close="isDeleteTaskVisible = false"
    />
</template>


<script lang="ts" setup>
import { ref } from 'vue';  
import { useBoardStore } from '../../../store/boards.store';
import { useTaskStore } from '../../../store/tasks.store';
import CreateTask from '../modal/CreateTask.vue';
import ViewTask from '../modal/ViewTask.vue';
import type { TaskResponse } from '../../../types/task';
import EditTask from '../modal/EditTask.vue';
import DeleteTask from '../modal/DeleteTask.vue';

const boardStore = useBoardStore() 
const taskStore = useTaskStore() 

const isCreateTaskVisible = ref(false)
const isViewTaskVisible = ref(false)
const isEditTaskVisible = ref(false)
const isDeleteTaskVisible = ref(false)

const selectedTask = ref<TaskResponse>({} as TaskResponse)

function selectTask(task: TaskResponse){
    selectedTask.value = task ? task : {} as TaskResponse
    isViewTaskVisible.value = true
}

function editTask(task: TaskResponse){
    selectedTask.value = task
    isEditTaskVisible.value = true
}

function deleteTask(task: TaskResponse){
    selectedTask.value = task
    isDeleteTaskVisible.value = true
}

</script>

<style scoped>
h2{
    color: #32ba7c;
}

/* ------- TASKS ------- */
.task-container{
    width: 60%;
    background-color: #242424;
    height: 100%; 
    border-left: 1px solid gray;
    border-right: 1px solid gray;
    display: flex;
    flex-direction: column;
}
.task-top{
    background-color: #242424;
    padding: 0 1vw;
    border-bottom: 1px solid gray;
    height: 7vh;
    width: auto;
    position: sticky;
    top: 0;
    display: flex;
}
.task-top h2{
    margin: 1vh 0;
}
.tasks { 
    overflow-y: auto;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.task-card {
    background: #303030;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #444;
    cursor: pointer;
    display: flex;
    flex-direction: column;
}
.task-card-row {   
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.task-card-bottom {   
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.task-btn{ 
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5vw;
}
.bottom{
    margin-top: auto;
}
.task-card-row h3{
    text-align: left; 
}
.task-card-comment {   
    display: flex;
    flex-direction: row;
    align-items: center; 
    justify-content: right; 
}
.task-card-bottom img{   
    height: 1.3vw;
    margin-left: .3vw;
}
.task-card-comment p {
    margin: 0;
    align-self: center;
    text-align: left;
    font-size: .9rem; 
}
.task-card-row span{    
    padding: .5vh .5vw;
    border-radius: 8px;
}
.task-card h3 {
    margin: 0 0 0.5rem 0;
    align-self: flex-start;
}
.task-card p {
    margin: 0 0 0.5rem 0;
    align-self: flex-start;
    text-align: left;
    font-size: .9rem;
}
.task-card-row .status {
    font-size: 0.8rem;
    margin-bottom: auto;
}
.task-card-row .urgent{
    color: #ff1515;
    border: 1px solid #ff1515; 
}
.task-card-row .normal{ 
    color: #32ba7c;
    border: 1px solid #32ba7c; 
}

.task-card:hover, .create-task-card:hover {
    background: #3d3d3d;  
}

.create-task-card {
    background: #242424; 
    border-radius: 8px;
    border: 1px solid #444;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    min-height: 18vh;
}
</style>
