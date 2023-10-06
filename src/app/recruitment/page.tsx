import { Bungee_Outline } from "next/font/google";
import type { Metadata } from "next";
const bungeeOutline = Bungee_Outline({ weight: "400", subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
    title: "Vietnam Hat 2023 - Dec 16th-17th",
    description: "Recruitment",
};

export default function Recruitment() {
    return (
        <main className={`flex min-h-screen w-screen flex-col grid-bg`}>
            <section className="h-[100dvh] w-full max-w-screen-lg grid grid-cols-1 grid-rows-1 p-4 mx-auto">
                <div className="grid grid-rows-5 grid-cols-1 border-4 border-[rgb(var(--foreground-rgb))] gap-6">
                    <div className="px-6 py-3 lg:px-12 lg:py-6 border-b-4 border-[rgb(var(--foreground-rgb))] grid place-content-center">
                        <h2 className={`text-5xl lg:text-7xl text-center ${bungeeOutline.className}`}>
                            Vietnam Hat 2023 <br />
                        </h2>
                    </div>
                    <div className="row-span-3 px-6 py-3 lg:px-12 lg:py-6 grid gap-4 grid-cols-1 max-w-3xl w-full mx-auto overflow-y-auto overflow-x-hidden">
                        <h2 className="text-xl font-medium">Chào mọi người.</h2>
                        <p>
                            Dự kiến, Vietnam Hat năm nay sẽ diễn ra vào ngày 16 & 17 tháng 12. <br />
                            Khá là ít thời gian, vậy nên để chuẩn bị tốt nhất cho giải, rất cần cộng đồng nhiệt tình tham gia hỗ trợ. Sẽ cần phải làm rất nhiều việc và cần nhiều người giúp đỡ.
                        </p>
                        <div className="grid gap-2 content-start">
                            <span>Hiện tại, BTC đang cần tuyển</span>
                            <ul className="list-disc grid gap-2 pl-4">
                                <li>
                                    <span className="font-medium">1 bạn làm Content event page, Communications bằng email cho VNH.</span> <br />
                                    <span className="italic">(Job này sẽ cần bạn nào có Tiếng Anh tốt nhé)</span> <br />
                                    Nhiệm vụ chủ yếu <br />
                                    <ul className="pl-4">
                                        <li className="grid grid-cols-[auto_minmax(0,1fr)]">
                                            <span>💯</span>
                                            Lên bài theo timeline.
                                        </li>
                                        <li className="grid grid-cols-[auto_minmax(0,1fr)]">
                                            <span>💯</span>
                                            Chịu trách nhiệm về hình ảnh của bài post.
                                        </li>
                                        <li className="grid grid-cols-[auto_minmax(0,1fr)]">
                                            <span>💯</span>
                                            Đọc email và giải quyết yêu cầu của player qua email.
                                        </li>
                                        <li className="grid grid-cols-[auto_minmax(0,1fr)]">
                                            <span>💯</span>
                                            Lập và quản lý sanh sách player.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <span className="font-medium">1 bạn làm Lead team logistics</span> <br />
                                    <span className="italic">(Job này thì cần Tiếng Việt tốt)</span>
                                    <br />
                                    Phụ trách quản lý việc <br />
                                    <ul className="pl-4">
                                        <li className="grid grid-cols-[auto_minmax(0,1fr)]">
                                            <span>💯</span>
                                            Chuẩn bị tất cả những thứ như áo, đĩa, volunteer.
                                        </li>
                                        <li className="grid grid-cols-[auto_minmax(0,1fr)]">
                                            <span>💯</span>
                                            Điều hành volunteer trên sân.
                                        </li>
                                        <li className="grid grid-cols-[auto_minmax(0,1fr)]">
                                            <span>💯</span>
                                            In ấn, mua đồ dùng dụng cụ.
                                        </li>
                                        <li className="grid grid-cols-[auto_minmax(0,1fr)]">
                                            <span>💯</span>
                                            Sắp xếp hotel, bus cho player.
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <p>
                                Dành cho các bạn chủ tịch trẻ <br />
                                Đây là công việc sẽ giúp các bạn biết hơn về qui trình tổ chức và điều hành một giải ném đĩa Quốc Tế, để sau này có thể dẫn dắt lứa tiếp theo.
                            </p>
                            <div className="flex flex-wrap items-center justify-center min-h-[56px] text-center px-4 lg:px-8 py-4 rounded-md bg-[rgb(var(--foreground-rgb))] text-[rgb(var(--background-start-rgb))] font-bold">
                                <span>🌟🌟🌟</span>{" "}
                                <span>
                                    Miễn phí tham gia VNHAT <span className="inline-block">ở package cao nhất</span>
                                </span>{" "}
                                <span>🔥🔥🔥</span>
                            </div>
                        </div>
                    </div>
                    <div className="border-t-4 border-[rgb(var(--foreground-rgb))] grid place-content-center gap-4 px-6 py-3 lg:px-12 lg:py-6">
                        <span className="text-center">Liên hệ trực tiếp</span>
                        <div className="grid grid-cols-[auto_minmax(0,1fr)] content-start gap-x-6 gap-y-1">
                            <small>Messenger</small>
                            <small>Phone</small>

                            <a href="https://www.facebook.com/vu.a.vu.7" target="blank" className="underline">
                                Anh Dũ Anh Dũ
                            </a>
                            <a href="tel:+84903059569" className="underline">
                                0903.0595.69
                            </a>

                            <a href="https://www.facebook.com/vu.a.vu.7" target="blank" className="underline">
                                Cục Xương
                            </a>
                            <a href="tel:+84919541838" className="underline">
                                0919.541.838
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
