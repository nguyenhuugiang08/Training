<script setup>
import { MISA_ENUM } from "../base/enum";
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
    title: { type: String, required: true },
    textInfo: { type: String, required: true },
});

const emit = defineEmits(["closeInfo"]);
const refNoButton = ref(null); // Tham chiếu tới button có trong DOM

/**
 * Xử lý đóng pop up info
 * Created by: NHGiang - (20/02/23)
 */
const handleClosePopUp = () => {
    try {
        emit("closeInfo");
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý đóng form hiện tại
 * Created by: NHGiang - (20/02/23)
 */
const handleCloseForm = () => {
    try {
        emit("closeForm");
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý submit form hiện tại
 * Created by: NHGiang - (20/02/23)
 */
const handleSubmitForm = () => {
    try {
        emit("submitForm");
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm xử lỹ phím tắt
 * @param {*} e
 * Created by: NHGiang - (24/02/23)
 */
const docKeyDown = (e) => {
    // Đóng popup error với phím tắt ESC
    if (e.keyCode === MISA_ENUM.KEY_CODE.ESCAPE) {
        handleClosePopUp();
    }
};

/**
 * Hàm thêm event keydown
 * Created by: NHGiang - (24/02/23)
 */
onMounted(() => {
    document.addEventListener("keydown", docKeyDown, false);
    refNoButton.value.focus();
});

/**
 * Hàm xử lý remove event
 * Created by: NHGiang - (24/02/23)
 */
onUnmounted(() => {
    document.removeEventListener("keydown", docKeyDown);
});
</script>

<template>
    <div class="modal-confirm">
        <div class="modal-confirm__title">{{ title }}</div>
        <div class="modal-confirm__close-btn modal__close-btn">
            <div
                :style="{
                    background:
                        'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -1178px -362px',
                    width: '12px',
                    height: '12px',
                }"
                @click="handleClosePopUp"
            ></div>
        </div>
        <div class="modal-confirm__content">
            <div class="modal-confirm__content-icon">
                <div
                    :style="{
                        background:
                            'url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -832px -462px',
                        width: '36px',
                        height: '36px',
                    }"
                ></div>
            </div>
            <div class="modal-confirm__content-text">{{ textInfo }}</div>
        </div>
        <div class="modal-footer modal-confirm__footer modal-confirm__footer--info">
            <div class="modal-footer__wrapper">
                <button
                    ref="refNoButton"
                    type="submit"
                    class="btn btn-secondary modal-btn__secondary"
                    tabindex="0"
                    @click="handleCloseForm"
                >
                    Không
                </button>
                <button
                    type="submit"
                    class="btn btn-primary"
                    tabindex="0"
                    @click="handleSubmitForm"
                >
                    Có
                </button>
            </div>
            <button
                for="show-modal"
                class="btn btn-secondary modal-btn-cancel"
                @click="handleClosePopUp"
            >
                Hủy
            </button>
        </div>
    </div>
</template>

<style scoped>
.modal-confirm__footer--info {
    flex-direction: row-reverse;
}
</style>
