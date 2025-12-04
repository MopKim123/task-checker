<template>
    <!-- Backdrop always rendered -->
    <div class="boardpage"> 
        <BoardContainer/>
        <TaskContainer/>        
        <InfoContainer/>
    </div>
</template>


<script lang="ts" setup> 
import BoardContainer from './child/BoardContainer.vue';
import InfoContainer from './child/InfoContainer.vue';
import TaskContainer from './child/TaskContainer.vue'; 

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
/* .info-container{
}  */



/* ------- INFORMATION ------- */
.info-container{
    width: 20%;
    background-color: #242424;
    height: 100%; 
}




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
