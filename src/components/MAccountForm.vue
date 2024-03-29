<script setup>
import MInput from "./MInput.vue";
import MCheckbox from "./MCheckbox.vue";
import MTrackDetail from "./MTrackDetail.vue";
import { MISA_RESOURCE, ACCOUNT_TRACK } from "../base/resource";
import { ref, reactive, inject, onMounted, onUnmounted, watch } from "vue";
import { useAccount } from "../composable/useAccount";
import { MISA_ENUM } from "../base/enum";
import { error } from "../utilities/validateForm";
import MPopUpInfo from "./MPopUpInfo.vue";
import MPopUpError from "./MPopUpError.vue";
import { useValidate } from "../utilities/validateForm";
import { useRoute } from "vue-router";
import { handleSetStatusForm } from "../utilities/setDefaultStateForm";

const { state, setIsForm, setEntitySelected } = inject("diy");

const { getAccounts, addAccount, getAccountsByFilter, editAccount } = useAccount();
getAccounts();

const isOpenError = ref(false); // trạng thái đóng mở popup error khi có lỗi xảy ra
const refCancelBtn = ref(null); // ref của button Hủy
const refSaveAndAddBtn = ref(null); // ref của button cất và thêm
const refAccountNumber = ref(null); // ref của ô input số tài khoản
const isShowNote = ref(false); // Trạng thái Đóng Mở thông báo dữ liệu form đã thay
const isShowTrackDetail = ref(true); // Trạng thái Đóng/Mở của theo dõi chi tiết
const isResize = ref(false); // Trạng thái Mở rộng/ Thu gọn
const pageSize = ref(20);

const route = useRoute();

const account = reactive({
    ParentId: state.entitySelected?.ParentId || state.parentId,
    AccountNumber: state.entitySelected?.AccountNumber || "",
    AccountName: state.entitySelected?.AccountName || "",
    EnglishName: state.entitySelected?.EnglishName || "",
    Type: state.entitySelected?.Type || 1,
    TypeName: MISA_RESOURCE.ACCOUNT_NATURE[1].optionName,
    Description: state.entitySelected?.Description || "",
    HasForeignCurrencyAccounting: state.entitySelected?.HasForeignCurrencyAccounting || false,
    IsActive: state.entitySelected?.IsActive === false ? false : true,
    IsParent: state.entitySelected?.IsParent || false,
    IsTrackObject: state.entitySelected?.IsTrackObject || false,
    IsTrackJob: state.entitySelected?.IsTrackJob || false,
    IsTrackOrder: state.entitySelected?.IsTrackOrder || false,
    IsTrackPurchaseContract: state.entitySelected?.IsTrackPurchaseContract || false,
    IsTrackOrganizationUnit: state.entitySelected?.IsTrackOrganizationUnit || false,
    IsTrackBankAccount: state.entitySelected?.IsTrackBankAccount || false,
    IsTrackProjectWork: state.entitySelected?.IsTrackProjectWork || false,
    IsTrackSaleContract: state.entitySelected?.IsTrackSaleContract || false,
    IsTrackExpenseItem: state.entitySelected?.IsTrackExpenseItem || false,
    IsTrackItem: state.entitySelected?.IsTrackItem || false,
    Object: state.entitySelected?.Object || MISA_ENUM.TRACK_TYPE.ONLY_WARMING,
    Job:
        state.entitySelected?.Job === MISA_ENUM.TRACK_TYPE.REQUIRED
            ? MISA_RESOURCE.TRACK_TYPE[0].optionId
            : MISA_RESOURCE.TRACK_TYPE[1].optionId,
    Order:
        state.entitySelected?.Order === MISA_ENUM.TRACK_TYPE.REQUIRED
            ? MISA_RESOURCE.TRACK_TYPE[0].optionId
            : MISA_RESOURCE.TRACK_TYPE[1].optionId,
    PurchaseContract:
        state.entitySelected?.PurchaseContract === MISA_ENUM.TRACK_TYPE.REQUIRED
            ? MISA_RESOURCE.TRACK_TYPE[0].optionId
            : MISA_RESOURCE.TRACK_TYPE[1].optionId,
    OrganizationUnit:
        state.entitySelected?.OrganizationUnit === MISA_ENUM.TRACK_TYPE.REQUIRED
            ? MISA_RESOURCE.TRACK_TYPE[0].optionId
            : MISA_RESOURCE.TRACK_TYPE[1].optionId,
    BankAccount:
        state.entitySelected?.BankAccount === MISA_ENUM.TRACK_TYPE.REQUIRED
            ? MISA_RESOURCE.TRACK_TYPE[0].optionId
            : MISA_RESOURCE.TRACK_TYPE[1].optionId,
    ProjectWork:
        state.entitySelected?.ProjectWork === MISA_ENUM.TRACK_TYPE.REQUIRED
            ? MISA_RESOURCE.TRACK_TYPE[0].optionId
            : MISA_RESOURCE.TRACK_TYPE[1].optionId,
    SaleContract:
        state.entitySelected?.SaleContract === MISA_ENUM.TRACK_TYPE.REQUIRED
            ? MISA_RESOURCE.TRACK_TYPE[0].optionId
            : MISA_RESOURCE.TRACK_TYPE[1].optionId,
    ExpenseItem:
        state.entitySelected?.ExpenseItem === MISA_ENUM.TRACK_TYPE.REQUIRED
            ? MISA_RESOURCE.TRACK_TYPE[0].optionId
            : MISA_RESOURCE.TRACK_TYPE[1].optionId,
    Item:
        state.entitySelected?.Item === MISA_ENUM.TRACK_TYPE.REQUIRED
            ? MISA_RESOURCE.TRACK_TYPE[0].optionId
            : MISA_RESOURCE.TRACK_TYPE[1].optionId,
    Grade: state.entitySelected?.Grade || state.gradeAccountSelected + 1,
});

/**
 * Lấy ra số lượng bản ghi trên 1 trang sử dụng vue-router
 * created by : NHGiang
 */
watch(
    () => route.query.pageSize,
    (newValue) => {
        pageSize.value = newValue;
        try {
        } catch (error) {
            console.log(error);
        }
    }
);

/**
 * Hàm thực hiện submit form tài khoản
 * @param {*} identityAction -- Cất hoặc cất và thêm
 * Created by: NHGiang - (4/4/2023)
 */
const handleSubmit = async (identityAction) => {
    try {
        const status = useValidate({ account });
        const { TypeName, ...accountRest } = account;

        if (!status) {
            // xử lý thêm tài khoản
            if (
                state.identityForm === MISA_ENUM.FORM_MODE.ADD ||
                state.identityForm === MISA_ENUM.FORM_MODE.DUPLICATE
            ) {
                accountRest.IsParent = false;
                await addAccount(accountRest, identityAction)
                    .then(async () => {
                        await getAccountsByFilter(
                            state.keyword,
                            pageSize.value,
                            MISA_ENUM.PAGENUMBER_DEFAULT
                        );
                    })
                    .catch((isOpenError.value = true));
            }

            if (state.identityForm === MISA_ENUM.FORM_MODE.EDIT) {
                await editAccount(accountRest, state.entitySelected.AccountId, identityAction)
                    .then(async () => {
                        await getAccountsByFilter(
                            state.keyword,
                            pageSize.value,
                            MISA_ENUM.PAGENUMBER_DEFAULT
                        );
                    })
                    .catch((isOpenError.value = true));
            }
        } else {
            isOpenError.value = true;
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm xử lý binding dữ liệu khi enable ô input để thêm tiêu chí theo dõi
 * @param {*} event
 * Created by: NHGiang - (11/03/23)
 */
const handleChecked = (event) => {
    try {
        if (event.identity) {
            account[`IsTrack${event.identity}`] = event.isChecked;
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm lấy ra giá trị khi chọn các lựa chọn muốn theo dõi
 * @param {*} event
 * Created by: NHGiang - (11/03/23)
 */
const handleSelected = (event) => {
    try {
        if (event.identity) {
            account[`${event.identity}`] = event.option.optionId;
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm thực hiện đóng form khi nhấn nút close(x)
 * Created by: NHGiang - (14/03/23)
 */
const handleCloseForm = () => {
    try {
        let accountToCompare = {};
        const { TypeName, ...restAccount } = account;
        if (state.identityForm === MISA_ENUM.FORM_MODE.ADD) {
            accountToCompare = {
                ParentId: state.parentId || MISA_RESOURCE.GUID_EMPTY,
                AccountNumber: "",
                AccountName: "",
                EnglishName: "",
                Type: 1,
                Description: "",
                HasForeignCurrencyAccounting: false,
                IsActive: true,
                IsParent: false,
                IsTrackObject: false,
                IsTrackJob: false,
                IsTrackOrder: false,
                IsTrackPurchaseContract: false,
                IsTrackOrganizationUnit: false,
                IsTrackBankAccount: false,
                IsTrackProjectWork: false,
                IsTrackSaleContract: false,
                IsTrackExpenseItem: false,
                IsTrackItem: false,
                Object: MISA_ENUM.TRACK_TYPE.ONLY_WARMING,
                Job: MISA_ENUM.TRACK_TYPE.ONLY_WARMING,
                Order: MISA_ENUM.TRACK_TYPE.ONLY_WARMING,
                PurchaseContract: MISA_ENUM.TRACK_TYPE.ONLY_WARMING,
                OrganizationUnit: MISA_ENUM.TRACK_TYPE.ONLY_WARMING,
                BankAccount: MISA_ENUM.TRACK_TYPE.ONLY_WARMING,
                ProjectWork: MISA_ENUM.TRACK_TYPE.ONLY_WARMING,
                SaleContract: MISA_ENUM.TRACK_TYPE.ONLY_WARMING,
                ExpenseItem: MISA_ENUM.TRACK_TYPE.ONLY_WARMING,
                Item: MISA_ENUM.TRACK_TYPE.ONLY_WARMING,
                Grade: state.gradeAccountSelected ? state.gradeAccountSelected + 1 : 1,
            };
        }

        if (
            state.identityForm === MISA_ENUM.FORM_MODE.EDIT ||
            state.identityForm === MISA_ENUM.FORM_MODE.DUPLICATE
        ) {
            const { CreatedDate, ModifiedDate, CreatedBy, ModifiedBy, AccountId, Active, ...rest } =
                state.entitySelected;
            accountToCompare = rest;
        }

        if (JSON.stringify(accountToCompare) !== JSON.stringify(restAccount)) {
            isShowNote.value = true;
        } else {
            setIsForm();
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý set lại tabindex khi hết
 * @param {*} e event object
 * Created by: NHGiang - (20/02/23)
 */
const handleSetTabindex = (e) => {
    try {
        if (e.keyCode === MISA_ENUM.KEY_CODE.TAB) {
            e.preventDefault();
            refAccountNumber.value.handleFocusInput();
        }
        if (e.shiftKey && e.keyCode === MISA_ENUM.KEY_CODE.TAB) {
            refSaveAndAddBtn.value.focus();
        }
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
    // Cất form với phím tắt ctrl + S
    if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit(MISA_ENUM.STATUS_SAVE_ACCOUNT.SAVE);
    }

    // Cất form và mở form thêm với phím tắt ctrl + shift + S
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit(MISA_ENUM.STATUS_SAVE_ACCOUNT.SAVE_ADD);
    }

    // Đóng form với phím tắt ESC
    if (e.keyCode === MISA_ENUM.KEY_CODE.ESCAPE && !isOpenError.value) {
        handleCloseForm();
    }
};

/**
 * Hàm thêm event keydown và focus vào ô input số tài khoản
 * Created by: NHGiang - (24/02/23)
 */
onMounted(() => {
    try {
        refAccountNumber.value.handleFocusInput();
        document.addEventListener("keydown", docKeyDown, false);
    } catch (error) {
        console.log(error);
    }
});

/**
 * Hàm xử lý remove event
 * Created by: NHGiang - (24/02/23)
 */
onUnmounted(() => {
    document.removeEventListener("keydown", docKeyDown);
});

/**
 * Hàm set lại Tabindex khi nhấn Shift + Tab
 * Created by: NHGiang - (26/02/23)
 */
const handleSetReverseTabindex = (e) => {
    try {
        if (e.shiftKey && e.keyCode === MISA_ENUM.KEY_CODE.TAB) {
            e.preventDefault();
            refCancelBtn.value.focus();
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm thay đổi giá trị ô checkbox hạch toán ngoại tệ
 * Created by: NHGiang - (25/03/23)
 */
const changeCheckboxForeignCurrencyAccounting = () => {
    try {
        account.HasForeignCurrencyAccounting = !account.HasForeignCurrencyAccounting;
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="overlay-form">
        <div :class="{ 'account-form': true, 'account-form--extend': isResize }">
            <div class="modal__header">
                <div class="modal__header-left">
                    <div class="modal__header-left-text">{{ state.titleForm }}</div>
                </div>
                <div class="modal__header-right">
                    <div class="modal__close-btn" @click="handleCloseForm">
                        <label
                            for="show-modal"
                            :style="{
                                background:
                                    'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -147px -147px',
                                width: '18px',
                                height: '18px',
                                cursor: 'pointer',
                            }"
                        ></label>
                    </div>
                </div>
            </div>
            <div class="account-main">
                <div class="row">
                    <m-input
                        ref="refAccountNumber"
                        field-text="Số tài khoản"
                        required
                        width="25%"
                        bottom="12px"
                        full-width
                        :value="account.AccountNumber"
                        :status="error.AccountNumber.status"
                        :statusPublic="error.status"
                        :text-error="error.AccountNumber.textError"
                        @inputValue="account.AccountNumber = $event"
                        @changeValue="error.AccountNumber.status = $event"
                        @keydown="handleSetReverseTabindex"
                    />
                </div>
                <div class="row">
                    <m-input
                        field-text="Tên tài khoản"
                        required
                        width="100%"
                        bottom="12px"
                        full-width
                        :value="account.AccountName"
                        :status="error.AccountName.status"
                        :statusPublic="error.status"
                        :text-error="error.AccountName.textError"
                        @changeValue="error.AccountName.status = $event"
                        @inputValue="account.AccountName = $event"
                    />
                    <m-input
                        field-text="Tên tiếng anh"
                        width="100%"
                        bottom="12px"
                        full-width
                        style="margin-left: 8px"
                        :value="account.EnglishName"
                        @inputValue="account.EnglishName = $event"
                    />
                </div>
                <div class="row">
                    <div class="checkbox-wrapper" style="width: 25%; margin-right: 8px">
                        <m-checkbox
                            v-if="state.listAllAccounts.length"
                            text-label="Tài khoản tổng hợp"
                            width="100%"
                            bottom="12px"
                            :default="account.ParentId"
                            :options="state.listAllAccounts"
                            :isTable="true"
                            :columns="MISA_RESOURCE.COLUMNS_NAME_COMBOBOX_ACCOUNT"
                            @select="
                                account.ParentId =
                                    $event.optionId === -1
                                        ? MISA_RESOURCE.GUID_EMPTY
                                        : $event.optionId;
                                account.Grade = $event.optionGrade ? $event.optionGrade + 1 : 1;
                            "
                        />
                    </div>
                    <div class="checkbox-wrapper" style="width: 25%">
                        <m-checkbox
                            text-label="Tính chất"
                            required=""
                            width="100%"
                            bottom="12px"
                            :default="account.Type"
                            :options="MISA_RESOURCE.ACCOUNT_NATURE"
                            :isTable="false"
                            :status="error.Type.status"
                            :statusPublic="error.status"
                            :text-error="error.Type.textError"
                            @select="
                                account.Type = $event.optionId;
                                account.TypeName = $event.optionName;
                            "
                            @changeValue="error.Type.status = $event"
                        />
                    </div>
                </div>
                <div class="row" style="width: 100%">
                    <div class="textarea-wrapper">
                        <label class="textfield__label modal-label"> Diễn giải</label>
                        <textarea
                            class="account-form__textarea"
                            :value="account.Description"
                            @input="account.Description = $event.target.value"
                        ></textarea>
                    </div>
                </div>
                <div class="row">
                    <label
                        for="accounting"
                        class="modal__header-left-wrapper account-checkbox"
                        tabindex="0"
                        @keydown.enter="changeCheckboxForeignCurrencyAccounting"
                    >
                        <input
                            type="checkbox"
                            id="accounting"
                            :checked="account.HasForeignCurrencyAccounting"
                            @change="changeCheckboxForeignCurrencyAccounting"
                        />
                        <div class="check-icon"></div>
                    </label>
                    <span @click="changeCheckboxForeignCurrencyAccounting"
                        >Có hạch toán ngoại tệ</span
                    >
                </div>
            </div>
            <div class="account-track-detail">
                <div
                    class="row account-track__title"
                    @click="isShowTrackDetail = !isShowTrackDetail"
                >
                    <div class="m-icon">
                        <div
                            class="account-track-detail__icon"
                            :style="{
                                transform: !isShowTrackDetail ? 'rotate(90deg)' : 'rotate(0deg)',
                            }"
                        ></div>
                    </div>
                    Theo dõi chi tiết theo
                </div>
                <div class="track-detail" :style="{ height: !isShowTrackDetail ? '0' : '300px' }">
                    <m-track-detail
                        v-for="(item, index) in ACCOUNT_TRACK"
                        :key="index"
                        :standard="item"
                        :index="index"
                        @select="handleSelected"
                        @onCheckInput="handleChecked"
                        :checked="account[`IsTrack${item.identity}`]"
                        :selected="account[`${item.identity}`]"
                    />
                </div>
            </div>
            <div class="modal-footer account-form__footer">
                <div class="modal-footer__wrapper">
                    <button
                        type="submit"
                        class="btn btn-secondary modal-btn__secondary btn-save"
                        tabindex="0"
                        @click="handleSubmit(MISA_ENUM.STATUS_SAVE_ACCOUNT.SAVE)"
                    >
                        Cất
                    </button>
                    <button
                        class="btn btn-primary btn-save-add"
                        tabindex="0"
                        ref="refSaveAndAddBtn"
                        @click="handleSubmit(MISA_ENUM.STATUS_SAVE_ACCOUNT.SAVE_ADD)"
                    >
                        Cất và thêm
                    </button>
                </div>
                <button
                    for="show-modal"
                    class="btn btn-secondary modal-btn-cancel"
                    tabindex="0"
                    ref="refCancelBtn"
                    @click="setIsForm()"
                    @keydown="handleSetTabindex"
                >
                    Hủy
                </button>
            </div>

            <div class="account-form__resize" @click="isResize = !isResize">
                <div class="form-resize__icon"></div>
            </div>
        </div>
        <div class="modal-error" v-if="isShowNote">
            <m-pop-up-info
                :title="'Thông báo'"
                text-info="Dữ liệu đã bị thay đổi. Bạn có muốn cất không?"
                @closeInfo="isShowNote = !isShowNote"
                @closeForm="setIsForm()"
                @submitForm="
                    handleSubmit();
                    isShowNote = !isShowNote;
                "
            />
        </div>
        <div class="modal-error" v-if="isOpenError">
            <m-pop-up-error
                :title="'Lỗi'"
                :text-error="
                    error.AccountNumber.textError ||
                    error.AccountName.textError ||
                    error.Type.textError
                "
                @closeError="isOpenError = !isOpenError"
            />
        </div>
    </div>
</template>

<style>
.textarea-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.account-form__textarea {
    resize: none;
    border-radius: 3px;
    border: 1px solid #babec5;
    font-family: inherit;
    display: block;
    padding: 9px;
    color: #000;
    font-size: 13px;
    width: 100%;
    height: 100%;
    border: 1px solid var(--border-color);
    outline: none;
    margin-bottom: 12px;
}

.account-form__textarea:focus {
    border: 1px solid var(--primary-color);
}

.account-form__textarea:hover {
    background-color: #f6f6f6;
}

.track-text {
    line-height: 28px;
}

.toast-account {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
}
</style>
