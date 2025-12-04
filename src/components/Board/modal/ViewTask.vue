<template>
    <!-- Backdrop always rendered -->
    <div class="modal-backdrop" :class="{ 'show': visible }" @click.self="close">
        <transition name="slide">
        <div class="modal" v-if="visible">
            <div class="modal-top">
                <h2>{{ selectedTask?.title }}{{ selectedTask?.title }}{{ selectedTask?.title }}</h2> 
                <span class="status" :class="selectedTask?.status === 'URGENT' ? 'urgent' : 'normal'">{{ selectedTask?.status }}</span>
            </div>
            <div class="description">
                <h4>Description</h4>
                <span><i>{{ selectedTask?.description }}</i></span>
            </div>
            <span class="assigned">Assigned to: <b><i>{{ selectedTask?.assignedTo.username }}</i></b></span>
            <hr>
            <div class="comment-container" ref="commentContainer">
                <div class="comment" v-for="comment in taskComments">
                    <div class="content">
                        <img src="../../../assets/reply.png" class="icon" />
                        <p>{{ comment.message }}</p>  
                    </div>
                    <div class="comment-info">
                        <h5>{{ comment.author.username }}</h5>
                        <h6>{{ formatDate(comment.createdAt) }}</h6>
                    </div>
                </div> 
            </div>
            <div class="comment-input">
                <input v-model="newComment.message" placeholder="Comment" required @keyup.enter="create"/>  
                <img src="../../../assets/send.png" class="icon" @click="create"/>
            </div>
        </div>
        </transition>
    </div>
</template>


<script lang="ts" setup>
import { defineProps, defineEmits, ref, computed, watch, nextTick} from 'vue'  
import { useTaskStore } from '../../../store/tasks.store'; 
import type { CommentRequest, TaskResponse } from '../../../types/task';
import { useEventTypeStore } from '../../../store/eventType.store';
import { sendEvent } from '../../../services/websocket';
import { useBoardStore } from '../../../store/boards.store';
import { formatDate } from '../../../composables/utils';


const taskStore = useTaskStore()
const boardStore = useBoardStore()
const eventType = useEventTypeStore()
const newComment = ref({} as CommentRequest)
const commentContainer = ref<HTMLDivElement | null>(null);


const props = defineProps<{  
    selectedTask: TaskResponse | undefined
    visible: boolean 
}>()
const taskComments = computed(() => {
    if (!props.selectedTask) return [];
    return taskStore.comments.filter(c => c.task?.id === props.selectedTask?.id);
});

watch(taskComments, () => {
    nextTick(() => {
        if (commentContainer.value) {
            commentContainer.value.scrollTop = commentContainer.value.scrollHeight;
        }
    });
});

// watch to update the count and comment when comment length

const emit = defineEmits<{ 
    (e: 'close'): void
}>()

function close() {
    emit('close')
} 

function create() {
    newComment.value.authorId = Number(localStorage.getItem("userId"))
    newComment.value.taskId = props.selectedTask?.id || 0
    const type = eventType.COMMENT_ADDED
    const boardId = boardStore.current.id
    const data = newComment.value
    const message = {type, boardId, data}
    sendEvent(message) 
    newComment.value.message = ''
} 
</script>

<style scoped>
.modal h2{
    color: #32ba7c;
    margin: 0;
    font-size: 2rem;
    text-align: left;
}
.modal .assigned{
    margin: 1vh auto 1vh 0;
}
.modal hr{ 
    margin: 0;
}

.modal{
    background-color: #242424; 
    border: 1px solid white;
    padding: 1vh 2vw;
    width: 50%;
    height: 65%;
    border-radius: 2vh;
    display: flex;
    flex-direction: column;
} 

.modal-top{ 
    display: flex; 
    justify-content: space-between;
} 
.status{
    padding: .5vh .5vw;
    border-radius: 8px;
    margin-top: 1.5vh;
    margin-bottom: auto;
    color: #242424;
    font-weight: bold;
}
.urgent{ 
    background: #ff1515;
}
.normal{
    /* border: 1px solid #32ba7c;   */
    background: #32ba7c;
}

.description h4{
    margin: 1vh 0; 
}
.description span{
    display: block;
    text-align: left;
    text-indent: 2rem; 
}


.comment-container{
    overflow-y: scroll; 
    margin-top: auto;
}
.comment{
    flex-direction: row;
    display: flex;
    border-bottom: 1px solid rgb(67, 67, 67);
    width: 100%;
}
.comment h6,h5{
    margin: 0;
    text-align: right;
}
.comment h6{
    color: gray;
}
.comment-info{
    margin: 1vh 0 auto auto;
}
.content{
    display: flex; 
    width: 77%;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-left: 2vw; 
}
.content img{
    height: 1.3rem;
    margin-bottom: auto;
    margin-top: .8vh;
}
.content p{
    margin: .5vh 0;
    text-align: left;
}
.comment-input{  
    border-top: 1px solid gray;
    padding-top: .5vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.comment-input img{
    margin: 0 .5vw;
    cursor: pointer;
}
.comment-input img:active{
    height: 1.8rem;
    margin: 0 .6vw;
}
input, select{
    padding: 1vh;
    border-radius: 5px;
    border: 1px solid white;
} 
input{ 
    width: 90%;
}
select{ 
    width: 75%;
    margin: 1vh 0;
}
textarea{ 
    max-width: 73%;
    min-width: 73%;
    margin: 1vh 0; 
}
h2{
    color: white;
}
h3, h4{
    text-align: left;
}
h4{
    margin: .5vh 1vw;
}

.buttons{ 
    display: flex;
    justify-content: space-around;
    margin-top: 1vh;
}

button{
    background-color: #242424; 
    color: rgb(255, 255, 255);
    border: 1px solid white;
}
button:hover{
    background-color: #444444; 
}
button:active{
    background-color: #242424; 
}

.modal-backdrop {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(124, 124, 124, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 100;
}

.modal-backdrop.show {
    opacity: 1;
    pointer-events: all;
}

/* Slide animation for modal */
.slide-enter-active, .slide-leave-active {
    transition: all 0.3s ease;
}
.slide-enter-from { opacity: 0; transform: translateY(-10%); }
.slide-enter-to { opacity: 1; transform: translateY(0); }
.slide-leave-from { opacity: 1; transform: translateY(0); }
.slide-leave-to { opacity: 0; transform: translateY(-10%); }
</style>
