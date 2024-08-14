import React, { FC, ReactNode } from "react";
// Swiperモジュール
import { Swiper, SwiperSlide } from "swiper/react";

// swiperで用意されているデフォルトののスタイル
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// 自分が用意したcss
import "./styles.css";

// ナビゲーションやページネーションのモジュール
import { Navigation, Pagination } from "swiper/modules";

const SwiperWrapper = (props: { children: ReactNode[] }) => {
    return (
        <>
            <Swiper
                //dir="rtl"
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Navigation, Pagination]}
            >
                {props.children?.map((child, index) => (
                    <SwiperSlide key={index}>{child}</SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};
export default SwiperWrapper;
