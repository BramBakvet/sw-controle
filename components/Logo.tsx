import Image from 'next/image';

type Props = {
    image: string;
}

const Logo = ({image}: Props) => {
  return (
    <div>
        <Image src={image} alt='Logo' width={200} height={200} />
    </div>
  )
};

export default Logo;