<template>
    <!-- Backdrop always rendered -->
    <div class="boardpage"> 
        <div class="board-container">
            <div class="board-top">
                <h2>Boards</h2>
            </div>
            <div v-for="board in boardStore.boards" :key="board.id" class="board-card">
                <h3>{{ board.name }}</h3> 
            </div> 
        </div>
        <div class="task-container">
            <div class="task-top">

            </div>
            <div class="tasks">

            </div>  
        </div>
        <div class="info-container">

            
        </div>
    </div>
</template>


<script lang="ts" setup>
import { onMounted } from 'vue';
import { useBoardStore } from '../../store/boards.store'; 
const boardStore = useBoardStore() 

onMounted( async() => {
    await boardStore.getBoards(Number(localStorage.getItem('userId')));
}); 
  
</script>

<style scoped>
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
    padding: 1rem;
    background-color: #242424;
    border: 1px solid #ccc;
    border-radius: 8px; 
    margin: 1vh .5vw;
    height: 4vh;
    cursor: pointer;
}
.board-card:hover {
    background-color: #373737;
}
.board-card h3 {
    margin: 0;
}


/* ------- TASKS ------- */
.task-container{
    width: 60%;
    border-left: 1px solid gray;
    border-right: 1px solid gray;
}
.info-container{
    width: 20%;
}


/* ------- INFORMATION ------- */





.modal{
    background-color: #242424; 
    border: 1px solid white;
    padding: 5vh;
    width: 20vw;
    border-radius: 2vh;
    display: flex;
    flex-direction: column;
}

input{
    margin-bottom: 1rem;
    padding: 1vh;
    border-radius: 5px;
    border: 1px solid white;
} 
h2{
    color: white;
}

.buttons{ 
    display: flex;
    justify-content: space-around;
    margin-top: 1.5vh;
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

</style>
