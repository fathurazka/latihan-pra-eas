<template>
    <div class="homepage-container">
        <div class="group-list-container">
            <div class="account-name-container">
                <div class="account-name">
                    <h1>{{ username }}</h1>
                </div>
                <div class="create-group-container" @click="showCreateGroup">
                    <img src="C:\Users\Fathurazka Gamma\Documents\FP WEBPROG\pra-eas-fathurazka\Frontend\vue-pra-eas\src\assets\Create_Group.png">
                </div>
                <div class="join-group-container">
                    <button @click="showJoinGroup">Join Group</button>
                </div>
                <div class="logout-logo-container" @click="logout">
                    <img src="C:\Users\Fathurazka Gamma\Documents\FP WEBPROG\pra-eas-fathurazka\Frontend\vue-pra-eas\src\assets\logout.png">
                </div>

            </div>
            <div class="groupchat-container" v-for="group in groups" :key="group.id">
                <h1>{{ group.groupName }}</h1>
            </div>
        </div>
        <div class="chat-container">

        </div>

    </div>

    <div class="create-group-form-container" v-if="showCreateGroupForm">
        <div class="close-button" @click="hideCreateGroup">
            <button>X</button>
        </div>
        <div class="form-container">
            <input v-model="newGroupName" placeholder="Enter new group name">
            <button @click="createGroup">Create Group</button>
        </div>
    </div>

    <div class="join-group-form-container" v-if="showJoinGroupForm">
        <div class="close-button" @click="hideJoinGroup">
            <button>X</button>
        </div>
        <div class="form-container">
            <input v-model="groupIdToJoin" placeholder="Enter Group ID to Join">
            <button @click="joinGroup">Join Group</button>
        </div>
    </div>
</template>

<script>
import { store } from '../store';
import { useRouter } from 'vue-router';
import { ref, toRefs } from 'vue';
import { reactive } from 'vue';

export default {
    async created() {
        try {
            const response = await fetch('http://localhost:3000/api/groups/', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            store.groups = reactive(data.docs.filter(group => group.members.some(member => member.memberID.username === store.username)));

            console.log(store.groups)
        } catch (error) {
            console.log(error);
        }
    },
    setup() {
        const router = useRouter();

        const showCreateGroupForm = ref(false);

        const showCreateGroup = () => {
            showCreateGroupForm.value = true;
        }

        const hideCreateGroup = () => {
            showCreateGroupForm.value = false;
        }

        const showJoinGroupForm = ref(false);

        const showJoinGroup = () => {
            showJoinGroupForm.value = true;
        }

        const hideJoinGroup = () => {
            showJoinGroupForm.value = false;
        }

        const logout = () => {
            store.username = '';
            router.push('/');
        };

        const newGroupName = ref('');

        const createGroup = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/groups/', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        groupName: newGroupName.value,
                        members: [{
                            memberID: store.userID,
                            memberName: store.username,
                        }],
                    }),
                });

                const data = await response.json();

                console.log(data);

                store.groups.push(data.doc);

                newGroupName.value = '';

                showCreateGroupForm.value = false;
            } catch (error) {
                console.log(error);
            }
        };

        const groupIdToJoin = ref('');

        const joinGroup = async () => {
            try {
                const groupResponse = await fetch(`http://localhost:3000/api/groups/${groupIdToJoin.value}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const groupData = await groupResponse.json();

                groupData.members.push({
                    memberID: {
                        id: store.userID,
                    },
                    id: store.userID + 11,
                });

                const response = await fetch(`http://localhost:3000/api/groups/${groupIdToJoin.value}`, {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        members: groupData.members,
                    }),
                });

                const data = await response.json();

                console.log(data);

                if(data.message === 'Updated successfully.') {
                    store.groups.push(data.group);
                } else {
                    console.log('Failed to join group');
                }

                groupIdToJoin.value = '';
                showJoinGroupForm.value = false;
            } catch (error) {
                console.log(error);
            }
        }
        
        return {
            ...toRefs(store),
            logout,
            showCreateGroup,
            showCreateGroupForm,
            hideCreateGroup,
            newGroupName,
            createGroup,
            showJoinGroup,
            showJoinGroupForm,
            hideJoinGroup,
            groupIdToJoin,
            joinGroup,
        };
    },
};
</script>


<style scoped>
.homepage-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: blue;
}

.group-list-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 500px;
    height: 100%;
    background-color: red;
}

.account-name-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    background-color: yellow;
}

.account-name {
    display: flex;
    flex-direction: row;
    background-color: green;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 100%;
}

.create-group-container {
    display: flex;
    flex-direction: row;
    width: 60px;
    background-color: blue;
    height: 100%;
}

.join-group-container {
    display: flex;
    flex-direction: row;
    width: 60px;
    background-color: brown;
    height: 100%;
}

.create-group-container img {
    border-radius: 45px;
}

.logout-logo-container {
    display: flex;
    flex-direction: row;
    width: 60px;
    background-color: aqua;
    height: 100%;
}


.groupchat-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60px;
    background-color: gold;
    margin: 20px;
    margin-bottom: 0;
}

.chat-container {
    display: flex;
    flex-direction: column;
    flex: 5;
    height: 100vh;
    background-color: aquamarine;
}

.create-group-form-container {
    z-index: 99;
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 50vw;
    height: 50vh;
    background-color: pink;
}

.close-button {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    height: 40px;
    background-color: green;
}

.close-button button {
    width: 40px;
    height: 40px;
    background-color: red;
}

.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: blue;
    height: 100%;
    gap: 40px;
}

.join-group-form-container {
    z-index: 99;
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 50vw;
    height: 50vh;
    background-color: pink;
}
</style>