<template>
    <!-- Backdrop always rendered --> 
    <div class="info-container">
        <div class="info-top">
            <h2>Members</h2> 
        </div>
        <div v-for="member in taskStore.members" :key="member.user?.id" class="member-card">
            <h4>{{ member.user.username }}</h4> 
        </div> 
        <div v-if="addingMember" class="member-card">
            <input 
                v-model="newMemberUsername" 
                placeholder="Enter username"  
                @blur="cancelAdding"
                autofocus
            />

            <ul v-if="searchResults.length" class="dropdown">
                <li 
                    v-for="user in searchResults" 
                    :key="user.id" 
                    @mousedown.prevent="selectUser(user)"
                >
                    {{ user.username }}
                </li>
            </ul>
        </div> 
        <div v-else class="add-member-card" @click="addingMember = true" v-show="boardStore.current?.ownerId == userId">
            <img src="../../../assets/add.png" class="icon" title="Add Member"/>
        </div> 
    </div>  
</template>


<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'; 
import { useBoardStore } from '../../../store/boards.store'; 
import { useTaskStore } from '../../../store/tasks.store';
import type { AuthResponse } from '../../../types/auth';
import { searchUser } from '../../../services/auth';
import { useEventTypeStore } from '../../../store/eventType.store';
import { sendEvent } from '../../../services/websocket';

const boardStore = useBoardStore()  
const taskStore = useTaskStore()
const eventType = useEventTypeStore()
const userId = Number(localStorage.getItem('userId'))

const addingMember = ref(false)
const newMemberUsername = ref('')
const searchResults = ref<AuthResponse[]>([]);
let debounceTimeout: number | null = null; 

watch(newMemberUsername, (newVal) => {
    if (debounceTimeout) clearTimeout(debounceTimeout);

    debounceTimeout = window.setTimeout(async () => {
        if (!newVal) {
            searchResults.value = [];
            return;
        }

        try {
            searchResults.value = await searchUser(newVal);
        } catch (err) {
            console.error(err);
        }
    }, 300);
});


onMounted( async() => {
    await boardStore.getBoards(Number(localStorage.getItem('userId')));
}); 


function selectUser(user: AuthResponse){ 
    if (!newMemberUsername.value) return 
    newMemberUsername.value = ''
    addingMember.value = false 

    const type = eventType.MEMBER_ADDED
    const boardId = boardStore.current.id
    const data = {userId: user.id}
    const message = {type, boardId, data}
    sendEvent(message) 
}
function cancelAdding() {
    addingMember.value = false
    newMemberUsername.value = ''
}


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
    position: relative;
}
.member-card input{
    width: 100%;
}
.add-member-card {
    padding: 2vh 1.5vw; 
    border-radius: 8px; 
    margin: 1vh .5vw;
    height: 1vh;
    cursor: pointer;
    display: flex;
    align-items: center; 
    justify-content: center;
}
.add-member-card:hover,
.board-card:hover {
    background-color: #373737;
}
.board-card h5 {
    margin: 0;
} 
.add-member-card img{
    height: 3vh;
}


.dropdown {
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 4px;
    max-height: 200px;
    overflow-y: auto;
    background-color: #242424;
    position: absolute;
    top: 100%;
    width: 85%;
    z-index: 10;
    list-style: none;
    padding: 0;
}

.dropdown li {
    padding: 6px 10px;
    cursor: pointer;
}


.dropdown li:hover {
    background-color: #373737;
}

</style>
