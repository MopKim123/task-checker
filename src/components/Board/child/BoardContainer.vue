<template>
    <!-- Backdrop always rendered --> 
        <div class="board-container">
            <div class="board-top">
                <h2>Boards</h2>
            </div>
            <div v-for="board in boardStore.boards" :key="board.id" class="board-card" @click="selectBoard(board)">
                <h5>{{ board.name }}</h5> 
            </div> 
        </div>  
</template>


<script lang="ts" setup>
import { onMounted } from 'vue'; 
import { useBoardStore } from '../../../store/boards.store';
import type { BoardResponse } from '../../../types/board';
import { useTaskStore } from '../../../store/tasks.store';

const boardStore = useBoardStore()  
const taskStore = useTaskStore()

onMounted( async() => {
    await boardStore.getBoards(Number(localStorage.getItem('userId')));
}); 


async function selectBoard(board: BoardResponse) {
    boardStore.current = board 
    taskStore.initTaskEvents();
    boardStore.initBoardEvents()
    boardStore.connectToBoard(board.id)

    taskStore.getTasks(Number(board.id))
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
    border: 1px solid #ccc;
    border-radius: 8px; 
    margin: 1vh .5vw;
    height: 1vh;
    cursor: pointer;
    display: flex;
    align-items: center;
}
.board-card:hover {
    background-color: #373737;
}
.board-card h5 {
    margin: 0;
} 

</style>
