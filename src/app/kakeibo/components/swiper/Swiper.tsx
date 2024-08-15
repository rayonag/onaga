import React, { FC, ReactNode, useState } from "react";
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
    const [swiperEnabled, setSwiperEnabled] = useState(true);
    const handleTouchStart = () => {
        setSwiperEnabled(false);
    };
    const handleTouchEnd = () => {
        setSwiperEnabled(true);
    };
    return (
        <>
            <Swiper
                //dir="rtl"
                navigation={swiperEnabled}
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
