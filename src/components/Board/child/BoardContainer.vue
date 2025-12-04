<template>
    <!-- Backdrop always rendered --> 
        <div class="board-container">
            <div class="board-top">
                <h2>Boards</h2>
            </div>
            <div v-for="board in boardStore.boards" :key="board.id" class="board-card" @click="selectBoard(board)">
                <h5>{{ board.name }}</h5> 


                <img 
                    src="../../../assets/bin.png"
                    class="delete"
                    title="Delete Board"
                    @click.stop="deleteBoard(board)"
                />
            </div> 
            <div class="board-card">
                <input
                    v-show="addingBoard"
                    type="text"
                    placeholder="Enter board name"
                    ref="boardInput"
                    @blur="cancelAdding"
                    @keyup.enter="createBoard"
                />

                <img
                    v-show="!addingBoard"
                    src="../../../assets/add.png"
                    class="icon"
                    title="Add Board"
                    @click="startAdding"
                />
            </div>
        </div>  
</template>


<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { onMounted } from 'vue'; 
import { useBoardStore } from '../../../store/boards.store';
import type { BoardResponse } from '../../../types/board';
import { useTaskStore } from '../../../store/tasks.store';
import { useEventTypeStore } from '../../../store/eventType.store';
import { sendEvent } from '../../../services/websocket';

const boardStore = useBoardStore()  
const taskStore = useTaskStore()
const eventType = useEventTypeStore()

onMounted( async() => {
    await boardStore.getBoards(Number(localStorage.getItem('userId')));
    boardStore.initBoardEvents()
}); 


async function selectBoard(board: BoardResponse) {
    boardStore.current = board 
    taskStore.initTaskEvents();
    boardStore.connectToBoard(board.id)

    taskStore.getTasks(Number(board.id))
}

const addingBoard = ref(false)
const boardInput = ref<HTMLInputElement | null>(null)

function startAdding() {
    addingBoard.value = true
    nextTick(() => {
        boardInput.value?.focus()
    })
}

function cancelAdding() {
    addingBoard.value = false
}
function deleteBoard(board: BoardResponse) {

    const type = eventType.BOARD_DELETED
    const boardId = boardStore.current.id
    const data = {id: board.id}
    const message = {type, boardId, data}
    if(confirm("Are you sure you want to delete this board"))sendEvent(message) 
    
}

function createBoard() {
    const boardName = boardInput.value?.value.trim()
    if (!boardName) return

    const userId = localStorage.getItem("userId")

    // Handle board creation logic here

    const type = eventType.BOARD_CREATED
    const boardId = boardStore.current.id
    const data = {ownerId: userId, name: boardName}
    const message = {type, boardId, data}
    sendEvent(message) 

    console.log("Creating board:", message)

    cancelAdding()
}

</script>

<style scoped>
h2{
    color: #32ba7c;
}

/* ------- BOARD ------- */
.boardpage {  
    width: 100%;  
    height: 91.6vh;
    display: flex;
    justify-content: center;
    align-items: center;    
    
} 
.board-container, .task-container, .info-container{
    background-color: #242424;
    height: 100%; 
}
.board-top{
    background-color: #242424;
    padding: 0 1vw;
    border-bottom: 1px solid gray;
    height: 7vh;
    width: 90%;
    position: sticky;
    top: 0;
}
.board-top h2{
    margin: 1vh 0;
}
.board-container{
    width: 20%; 
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
}

.board-card {
    padding: 1.5vh 1.5vw;
    background-color: #242424; 
    border-radius: 8px; 
    margin: 1vh .5vw;
    height: 1vh;
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
}
.icon{
    height: 3vh;
    margin: 0 auto;
}
.delete{    
    height: 3vh;

}
.board-card:hover {
    background-color: #373737;
}
.board-card h5 {
    margin: 0;
} 

</style>
