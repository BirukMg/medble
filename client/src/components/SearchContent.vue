<template>
    <div>
        <div class="search-content">
            <div class="input-group mb-3">
             <datepicker :bootstrap-styling="true" placeholder="Select date" style="widdth: 100%;" v-if="search_type == 'events by date'">
                <div slot="beforeCalendarHeader" class="calender-header">
                    Choose a Date
                </div>
            </datepicker>
            <input type="text" v-if="search_type != 'events by date'" class="form-control" :placeholder="'Searching for ' + this.search_type_value" aria-label="Recipient's username" aria-describedby="basic-addon2">
            <div class="input-group-append">
                <select class="browser-default custom-select" v-model="search_type_value" @change="swap_search">
                    <option selected>Open this select menu</option>
                    <option v-for="category in categories" :key="category">{{category.toLowerCase()}}</option>
                </select>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker';
export default {
    name: 'SearchContent',
    components: {
        Datepicker
    },
    data() {
        return {
            datevalue: '',
            search_query: '',
            search_type: '',
            search_type_value: 'all',
            categories: ['All','MARCHANDISE','VEHICLE','CONSTRUCTION AND FARM EQUIPMENT','HOUSES','COMMUNITY','DISCUSSION FORUMS','SERVICES','REVIEWS','EVENTS','EVENTS BY DATE','EMPLOYMENT','RESUMES']
        }
    },
    mounted() {
        
    },
    methods: {
        swap_search(){
            this.search_type = this.search_type_value
        }
    },
}
</script>
<style scoped>
    .search-content{
        width: 50%;
        margin-left: 30%;
    }
</style>
