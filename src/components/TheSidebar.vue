<script setup>
import { inject, ref } from "vue";
const { state, setIsSidebar } = inject("diy");
const index = ref(1);
</script>

<template>
    <div class="navbar">
        <div class="navbar-header">
            <div class="sidebar-item__icon navbar-header__icon" v-if="!state.isSidebar">
                <div
                    :style="{
                        background:
                            'url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -428px -92px',
                        width: '16px',
                        height: '16px',
                    }"
                ></div>
            </div>
            <img
                src="../assets/img/Logo_Module_TiengViet_White.66947422.svg"
                alt=""
                class="navbar-header__logo"
                v-if="!state.isSidebar"
            />
            <div
                class="sidebar-item__icon header__left-three-strips"
                v-if="state.isSidebar"
                @click="setIsSidebar"
            >
                <div
                    :style="{
                        background:
                            'url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -847px -35px',
                        width: '16px',
                        height: '14px',
                    }"
                ></div>
            </div>
        </div>
        <ul class="sidebar-list" :style="{ width: state.isSidebar ? '52px' : '178px' }">
            <router-link
                to="/"
                :class="{ 'sidebar-item--active': index === 1 }"
                @click="index = 1"
                class="sidebar-item"
            >
                <div class="sidebar-item__icon">
                    <div
                        :style="{
                            background:
                                'url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -33px -1630px',
                            width: '18px',
                            height: '20px',
                        }"
                    ></div>
                </div>
                <p v-if="!state.isSidebar">T???ng quan</p>
            </router-link>
            <router-link
                to="/cash/procedure"
                @click="index = 2"
                :class="{ 'sidebar-item--active': index === 2 }"
                class="sidebar-item"
            >
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -78px -1631px;
                            width: 14px;
                            height: 18px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Ti???n m???t</p>
            </router-link>
            <router-link
                to="/deposits"
                :class="{ 'sidebar-item--active': index === 3 }"
                @click="index = 3"
                class="sidebar-item"
            >
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -121px -1633px;
                            width: 16px;
                            height: 16px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Ti???n g???i</p>
            </router-link>
            <router-link
                to="/purchase"
                :class="{ 'sidebar-item--active': index === 4 }"
                @click="index = 4"
                class="sidebar-item"
            >
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -165px -1632px;
                            width: 16px;
                            height: 18px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Mua h??ng</p>
            </router-link>
            <router-link
                to="/sell"
                :class="{ 'sidebar-item--active': index === 5 }"
                @click="index = 5"
                class="sidebar-item"
            >
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -206px -1631px;
                            width: 20px;
                            height: 18px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">B??n h??ng</p>
            </router-link>
            <router-link
                to="/order-management"
                :class="{ 'sidebar-item--active': index === 6 }"
                @click="index = 6"
                class="sidebar-item"
            >
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -254px -1632px;
                            width: 14px;
                            height: 17px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Qu???n l?? ????n h??ng</p>
            </router-link>
            <router-link
                to="/granary"
                :class="{ 'sidebar-item--active': index === 7 }"
                @click="index = 7"
                class="sidebar-item"
            >
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -294px -1632px;
                            width: 18px;
                            height: 17px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Kho</p>
            </router-link>
            <router-link
                to="/tools"
                :class="{ 'sidebar-item--active': index === 8 }"
                @click="index = 8"
                class="sidebar-item"
            >
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -339px -1633px;
                            width: 18px;
                            height: 17px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">C??ng c??? d???ng c???</p>
            </router-link>
            <router-link
                to="/fixed-assets"
                :class="{ 'sidebar-item--active': index === 9 }"
                @click="index = 9"
                class="sidebar-item"
            >
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -382px -1632px;
                            width: 17px;
                            height: 18px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">T??i s???n c??? ?????nh</p>
            </router-link>
            <router-link
                to="/tax"
                :class="{ 'sidebar-item--active': index === 10 }"
                @click="index = 10"
                class="sidebar-item"
            >
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -427px -1634px;
                            width: 16px;
                            height: 16px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Thu???</p>
            </router-link>
            <router-link
                to="/worth"
                :class="{ 'sidebar-item--active': index === 11 }"
                @click="index = 11"
                class="sidebar-item"
            >
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -471px -1633px;
                            width: 17px;
                            height: 17px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Gi?? th??nh</p>
            </router-link>
            <router-link
                to="/overall"
                :class="{ 'sidebar-item--active': index === 12 }"
                @click="index = 12"
                class="sidebar-item"
            >
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -514px -1632px;
                            width: 16px;
                            height: 18px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">T???ng h???p</p>
            </router-link>
            <router-link
                to="/fund"
                :class="{ 'sidebar-item--active': index === 13 }"
                @click="index = 13"
                class="sidebar-item"
            >
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -381px -1663px;
                            width: 18px;
                            height: 18px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Ng??n s??ch</p>
            </router-link>
            <router-link
                to="/report"
                :class="{ 'sidebar-item--active': index === 14 }"
                @click="index = 14"
                class="sidebar-item"
            >
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -552px -1636px;
                            width: 14px;
                            height: 13px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">B??o c??o</p>
            </router-link>
            <router-link
                to="/financial-analysis"
                :class="{ 'sidebar-item--active': index === 15 }"
                @click="index = 15"
                class="sidebar-item"
            >
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -207px -1667px;
                            width: 17px;
                            height: 14px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Ph??n t??ch t??i ch??nh</p>
            </router-link>
            <router-link
                to="/category"
                :class="{ 'sidebar-item--active': index === 16 }"
                @click="index = 16"
                class="sidebar-item"
            >
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.svg') no-repeat -1711px -33px;
                            width: 17px;
                            height: 14px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Danh m???c</p>
            </router-link>
        </ul>
    </div>
</template>

<style scoped></style>
