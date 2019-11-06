<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2 ">
                <div class="text-center">
                    <img :src="img" class="rounded-circle profile-pic" alt="Profile picture">
                </div>
            </div>
            <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
            <div class="col-sm-9 col-md-9 col-lg-9 col-xl-9 basic-info">
                <div class="row text-white">
                    <h3>Full Name</h3>
                </div>
                <div class="row text-white">
                    <h5>Profession</h5>
                </div>

                <div class="row text-white border-light border-top some-about" style="width: 100%">
                    <p class="text-justify">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident tempora doloribus</p>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <section>
                    <div class="row">
                        <i class="fa fa-envelope"></i>
                    </div>
                    <div class="row">
                        some@cool.com
                    </div>
                    <div class="row">
                        <i class="fa fa-mobile"></i>
                    </div>
                    <div class="row">
                        +251932264993
                    </div>
                    <div class="row">
                        <i class="fa fa-map-marker"></i>
                    </div>
                    <div class="row">
                        <p class="text-justify">Nifas Silk Lafto, woreda 12, Addis Ababa, Ethiopia</p>
                    </div>
                </section>

                <section>
                    <div class="row">
                    <div style="width: 100%; margin-top: 15%" >
                        <div class="row border-dark border-bottom resume-center">
                            <h2 class="font-weight-bold text-uppercase">Skill</h2>
                        </div>
                        <div class="row" v-for="i in 4" :key="i">
                            <h3 style="width: 100%"><span class="badge badge-dark" style="width: 100%">New</span></h3>
                        </div>
                    </div>
                </div>
                </section>

                <section>
                    <div class="row">
                    <div style="width: 100%; margin-top: 15%" >
                        <div class="row border-dark border-bottom resume-center">
                            <h2 class="font-weight-bold text-uppercase">Interest</h2>
                        </div>
                        <div class="row" v-for="i in 4" :key="i">
                            <h3 style="width: 100%"><span class="badge badge-dark" style="width: 100%">New</span></h3>
                        </div>
                    </div>
                </div>
                </section>
            </div>
            <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
            <div class="col-sm-9 col-md-9 col-lg-9 col-xl-9">
                <section>
                    <div class="row border-dark border-bottom resume-center">
                    <h2 class="font-weight-bold text-uppercase">Education</h2>
                </div>
                <div class="border-light border-bottom" v-for="i in 2" :key="i">
                    <div class="row resume-center">
                    <h2 style="margin-top: 2%">Study</h2>
                    </div>
                    <div class="row resume-center">
                        <h4>Institution</h4>
                    </div>
                    <div class="row resume-center">
                        <p class=" font-italic font-weight-bold">10/2015 – 07/2019</p>
                        <p class=" font-italic font-weight-bold" style="margin-left: 65%"> GPA: 2.65</p>
                    </div>
                </div>
                </section>

                <section style="margin-top: 5%">
                    <div class="row border-dark border-bottom resume-center">
                    <h2 class="font-weight-bold text-uppercase">WORK EXPERIENCE</h2>
                </div>
                <div class="border-light border-bottom" v-for="i in 2" :key="i">
                    <div class="row resume-center">
                    <h4 style="margin-top: 2%" class="font-weight-bold">Position</h4>
                </div>
                <div class="row resume-center">
                    <h4>Company</h4>
                </div>
                <div class="row resume-center">
                    <p class="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero porro esse vel harum, nihil magnam veniam sit debitis eos ex voluptatum dolorem ducimus, numquam atque nemo modi. A, consequatur soluta.</p>
                </div>
                <div class="row resume-center">
                    <div class="row resume-center">
                        <h6 class="font-weight-bold">Achievements/Tasks</h6>
                    </div>
                     <div class="row resume-center">
                        <p class="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero porro esse vel harum, nihil magnam veniam sit debitis eos ex voluptatum dolorem ducimus, numquam atque nemo modi. A, consequatur soluta.</p>
                    </div>
                </div>
                <div class="resume-center">
                    <p class="float-left font-italic font-weight-bold">10/2015 – 07/2019</p>
                    <p class="float-right font-italic font-weight-bold">Addis Ababa, Ethiopia </p>
                </div>
                <p class="font-italic font-weight-bold">Contact: info</p>
                </div>
                </section>
            </div>
        </div>
        <button type="button" class="btn btn-danger btn-sm">Delete resume</button>
    </div>
</template>
<script>
export default {
    name: 'ProfileHeader',
    components: {

    },
    data() {
        return {
            img:  require('../../../assets/img/img(31).jpg')
        }
    },
}
</script>
<style scoped>
    .profile-pic{
        width: 150px;
        height: 150px;
        cursor: pointer;
        /* margin-left: 25%; */
    }
    .basic-info{
        width: 100%;
        height: auto;
        background-color: #2E2E2E;
        border-radius: 3px;
        padding: 2% 0 0 5%
    }
    .some-about{
        border-top-width: 2px;
        border-top-color: #fff;
        padding-top: 5px;
    }
    .resume-center{
        padding: 0% 0 0 3%
    }
    .resume-side{
        margin: 2% 0 0 0;
    }
</style>
