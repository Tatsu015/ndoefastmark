import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ChangeEvent, useEffect, useState } from 'react'

type Rect = { x: number, y: number, w: number, h: number }


const Home: NextPage = () => {
  const [data, setData] = useState<string>();
  const [previewImage, setPreviewImage] = useState<string>();

  const [imageURL, setImageURL] = useState<string>();

  useEffect(
    () => {
      axios
        .get('http://127.0.0.1:5000/')
        .then((res) => {
          setData(res.data.message);
        })
        .catch((error) => console.error(error));
    }, []);

  function drawImageWithRect(file: File, rects: Rect[]) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const Canvas = document.createElement("canvas");
      Canvas.width = 1200
      Canvas.height = 1800

      const imgCtx = Canvas.getContext('2d')
      if (imgCtx) {
        const i = new Image()
        i.src = reader.result as string;
        i.onload = () => {
          imgCtx.drawImage(i, 0, 0)
          setImageURL(Canvas.toDataURL("image/png"));
          const rectCtx = Canvas.getContext("2d");
          if (rectCtx) {
            rects.forEach(r => {
              rectCtx.beginPath();
              rectCtx.fillStyle = "rgba(" + [0, 255, 255, 0.5] + ")";
              rectCtx.fillRect(r.x, r.y, r.w, r.h);
            });
          }
          setImageURL(Canvas.toDataURL("image/png"));
        }
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <>
      <div>
        <input
          id='image'
          name='image'
          type='file'
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (event?.target?.files?.[0]) {
              const file = event.target.files[0];
              let rects = []
              rects.push({ x: 0, y: 0, w: 200, h: 200 })
              rects.push({ x: 100, y: 100, w: 200, h: 200 })
              rects.push({ x: 0, y: 520, w: 200, h: 200 })
              drawImageWithRect(file, rects);
            }
          }} />
      </div>
      <img src={imageURL} />
    </>
  )
}

export default Home
