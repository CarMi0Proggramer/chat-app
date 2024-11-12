type AvatarOptions = {
    src?: string;
    alt?: string;
};

export default function Avatar({ src, alt }: AvatarOptions) {
    src = src ? src : "/user-avatar.svg";
    alt = alt ? alt : "User icon";

    return (
        <img
            className="size-7 sm:size-8 rounded-full object-contain object-center"
            src={src}
            alt={alt}
        />
    );
}
