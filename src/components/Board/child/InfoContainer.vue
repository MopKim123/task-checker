<template>
    <!-- Backdrop always rendered --> 
        <div class="info-container">
            <div class="info-top">
                <h2>Members</h2>
            </div>
            <div v-for="member in taskStore.members" :key="member.user.id" class="member-card">
                <h4>{{ member.user.username }}</h4> 
            </div> 
        </div>  
</template>


<script lang="ts" setup>
import { onMounted, watch } from 'vue'; 
import { useBoardStore } from '../../../store/boards.store'; 
import { useTaskStore } from '../../../store/tasks.store';

const boardStore = useBoardStore()  
const taskStore = useTaskStore()

onMounted( async() => {
    await boardStore.getBoards(Number(localStorage.getItem('userId')));
}); 

// watch(
//     () => boardStore.current.id,
//     id => {
//         console.log("id",id)
//         taskStore.getTasks(Number(id))
//     }
// ) 

</script>

<style scoped>
h2{
    color: #32ba7c;
}

/* ------- BOARD ------- */ 
.info-container{
    background-color: #242424;
    height: 100%; 
}
.info-top{
    background-color: #242424;
    padding: 0 1vw;
    border-bottom: 1px solid gray;
    height: 7vh;
    width: 90%;
    position: sticky;
    top: 0;
    margin-bottom: 1vh;
}
.info-top h2{
    margin: 1vh 0;
}
.info-container{
    width: 20%; 
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
}

.member-card {
    padding: 1.5vh 1.5vw; 
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
