import { NextRequest, NextResponse } from 'next/server';

const data = {
  message: '这是使用Cache-Control: max-age的缓存数据',
  timestamp: new Date().toISOString()
};

export async function GET(request: NextRequest) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return NextResponse.json(data, {
    headers: {
      // 设置强缓存，缓存时间为60秒
      'Cache-Control': 'max-age=60, public',
      // 设置过期时间为60秒后
      'Expires': new Date(Date.now() + 60 * 1000).toUTCString()
    }
  });
}
