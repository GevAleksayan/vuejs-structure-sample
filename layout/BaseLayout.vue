<template>
    <section class="w-100 base-page">
        <header v-if="header" ref="header"
                :style="{height: headerHeight, fontSize: headerFontSize}"
                class="header w-100 d-flex justify-content-center align-items-center py-2 text-center shadow-sm">
            <slot name="header"></slot>
        </header>
        <main class="w-100" :class="mainClass" :style="{height: mainHeight, overflowY: 'scroll',}">
            <slot></slot>
        </main>
        <footer v-if="footer" class="footer w-100 d-flex justify-content-center align-items-center position-relative">
            <slot name="footer"></slot>
        </footer>
    </section>
</template>

<script>
    export default {
        name: "BaseLayout",
        computed: {
            headerHeight() {
                return this.screenAngle ? '15%' : '10%';
            },
            mainHeight() {
                if(!this.footer && !this.header) {
                    return '100%';
                }
                if(!this.footer || !this.header) {
                    return this.screenAngle ? '85%' : '90%';
                }
                return this.screenAngle ? '70%' : '75%';
            },
        },
        props: {
            header: {
                type: Boolean,
                default: true,
            },
            footer: {
                type: Boolean,
                default: true,
            },
            mainClass: {
                type: String,
                default: 'px-3 pt-2 position-relative',
            }
        },
        data() {
            return {
                headerFontSize: '4.5vh',
                screenAngle: 0,
            }
        },
        created() {
            window.addEventListener("resize", this.calcHeaderFontSize);
            window.addEventListener("orientationchange", () => {
                this.screenAngle = screen.orientation.angle;
                this.calcHeaderFontSize()
            })
        },
        mounted() {
            this.calcHeaderFontSize();
            this.screenAngle = screen.orientation.angle;
        },
        destroyed() {
            window.removeEventListener("resize", this.calcHeaderFontSize);

        },
        methods: {
            calcHeaderFontSize() {
                if(this.$refs.header) {
                    this.headerFontSize = `${Math.floor(this.$refs.header.clientHeight * 0.5)}px`;
                }
            }
        }
    }
</script>

<style scoped>
    .header {
        box-sizing: border-box;
        color: #0636e2;
        border-bottom: 1px solid #dedede;
    }
    .footer {
        height: 15%;
    }
</style>