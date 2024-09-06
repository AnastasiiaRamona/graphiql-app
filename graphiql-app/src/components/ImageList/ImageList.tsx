import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image';
import itemData from '@/data/data';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <ImageList
      sx={{
        width: '70%',
        height: 'auto',
        '@media (max-width: 1004px)': {
          width: '99%',
        },
      }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.title}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <Image
            {...srcset(item.img.src, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
            fill
            style={{ objectFit: 'cover' }}
            sizes="height: auto"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
