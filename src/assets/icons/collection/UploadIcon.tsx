import { IconProps } from "../types";

export const UploadIcon = ({ size, color }: IconProps) => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width={size || "24"} height={size || "24"} viewBox="0 0 24 24" fill="none">
        <g clipPath="url(#clip0_8402_1479)">
          <path d="M7.75877 6.65073L10.5397 3.86887L10.5607 17.5003C10.5607 18.3287 11.2322 19.0002 12.0606 19.0002C12.889 19.0002 13.5605 18.3287 13.5605 17.5003L13.5395 3.88588L16.3044 6.65078C16.8799 7.24663 17.8295 7.26313 18.4253 6.68762C19.0212 6.11211 19.0377 5.16256 18.4622 4.56671C18.4501 4.5542 18.4378 4.54192 18.4253 4.52987L15.2135 1.31799C13.4562 -0.439323 10.6071 -0.439323 8.84974 1.31795L8.84969 1.31799L5.63786 4.52982C5.06236 5.12567 5.07885 6.07523 5.6747 6.65073C6.25598 7.21213 7.1775 7.21213 7.75877 6.65073Z" fill={color || "#8A6FAB"} />
          <path d="M22.499 14.5004C21.6706 14.5004 20.9991 15.1719 20.9991 16.0003V20.5911C20.9985 20.8167 20.8158 20.9995 20.5901 21.0001H3.40884C3.18319 20.9995 3.00039 20.8167 2.99987 20.5911V16.0003C2.99987 15.1719 2.32832 14.5004 1.49994 14.5004C0.671549 14.5004 0 15.1719 0 16.0003V20.5911C0.00220303 22.4729 1.52712 23.9977 3.40884 23.9999H20.5901C22.4718 23.9977 23.9967 22.4728 23.9989 20.5911V16.0003C23.999 15.1719 23.3274 14.5004 22.499 14.5004Z" fill={color || "#8A6FAB"} />
        </g>
        <defs>
          <clipPath id="clip0_8402_1479">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};
