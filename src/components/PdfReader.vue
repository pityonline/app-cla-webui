<template>
    <div class="show-pdf">
        <div>
            <pdf
                    :src="pdfSrc"
                    :page="currentPage"
                    @num-pages="pageCount=$event"
                    @page-loaded="currentPage=$event"
                    @loaded="loadPdfHandler"
            ></pdf>
        </div>

        <p class="pageClass">
            <span @click="changePdfPage(0)" :class="{grey: currentPage===1}">previous</span>
            {{currentPage}} / {{pageCount}}
            <span
                    @click="changePdfPage(1)"
                    :class="{grey: currentPage===pageCount}"
            >next</span>
        </p>
    </div>

</template>

<script>
    import pdf from "vue-pdf";

    export default {
        name: "PdfReader",
        components: {
            pdf,
        },
        props: ["dochref", "doctype"],

        computed: {
            pdfSrc() {
                return this.dochref
            },
            typeValue() {
                return this.doctype
            },
        },
        data() {
            return {
                currentPage: 0, // pdf文件页码
                pageCount: 0, // pdf文件总页数
                activeIndex: 0,
                numPages: undefined,
            };
        },

        methods: {
            // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
            changePdfPage(val) {
                if (val === 0 && this.currentPage > 1) {
                    this.currentPage--;
                }
                if (val === 1 && this.currentPage < this.pageCount) {
                    this.currentPage++;
                }
            },
            // pdf加载时
            loadPdfHandler(e) {
                console.log(this.pdfSrc);
                console.log(this.pdfSrc, this.doctype);

                this.currentPage = 1; // 加载的时候先加载第一页
            }
        },
        created() {
            console.log('created');
            console.log(this.pdfSrc);
            this.pdfSrc = pdf.createLoadingTask({
                url: this.pdfSrc,
                httpHeaders: {
                    'Token': this.$store.state.access_token,
                    'x-ipp-device-uuid': 'SOME_UUID',
                    'x-ipp-client': 'SOME_ID',
                    'x-ipp-client-version': 'SOME_VERSION'
                }
            })
            this.pdfSrc.promise.then(pdf => {
                this.numPages = pdf.numPages;
            }).catch(err=>{
                console.log(err);
            });
        },
        mounted() {
            // this.pdfSrc.then(pdf => {
            //     this.pageCount = pdf.pageCount;
            // });
            // this.pdfSrc = pdf.createLoadingTask({
            //     url: this.pdfSrc,
            //     httpHeaders: {'Token': this.$store.state.access_token}
            // })
        }
    };
</script>

<style scoped lang="less">
    .pageClass {
        text-align: center;

        & > span {
            border: 1px solid gray;
            border-radius: .2rem;
            display: inline-block;
            padding: .2rem;
            cursor: pointer;
        }

        & > span:hover {
            border: 1px solid #409EFF;
            background-color: #409EFF;
            color: white;
        }

        & > .grey:hover {
            background-color: #DCDFE6;
            border: 1px solid gray;
            color: #606266;
        }
    }

    .grey {
        background-color: #DCDFE6;
    }


</style>