import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

/**
 * @description 模拟的响应数据
 * @type {{message: string, timestamp: string}}
 */
const data: { message: string; timestamp: string; } = {
  message: '这是使用Last-Modified的缓存数据',
  timestamp: new Date().toISOString()
};

/**
 * @description 模拟资源的最后修改时间（固定值）
 * @type {Date}
 */
const lastModifiedDate: Date = new Date('2025-03-10');  // 使用固定日期

/**
 * @description 检查资源是否发生变化，通过比较客户端缓存的时间和服务端资源的最后修改时间
 * @param {string} [ifModifiedSince] - 客户端发送的If-Modified-Since头部值
 * @returns {boolean} - true表示资源已修改，false表示资源未修改
 */
function checkIfModifiedSince(ifModifiedSince?: string): boolean {
  if (!ifModifiedSince) return true;
  
  const clientDate = new Date(ifModifiedSince);
  console.log("line:28 route.ts clientDate::", clientDate);
  return lastModifiedDate > clientDate;
}

/**
 * @description 处理GET请求的路由处理函数
 * @param {NextRequest} request - Next.js请求对象
 * @returns {Promise<NextResponse>} 返回NextResponse响应对象
 * 
 * 实现了基于Last-Modified的HTTP缓存机制：
 * 1. 检查请求头中的if-modified-since
 * 2. 如果资源未修改，返回304状态码
 * 3. 如果资源已修改或首次请求，返回完整数据
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const headersList = await headers();
  const ifModifiedSince =  headersList.get('if-modified-since');

  // 如果资源未修改，返回304
  if (ifModifiedSince && !checkIfModifiedSince(ifModifiedSince)) {
    return new NextResponse(null, {
      status: 304,
      headers: {
        'Last-Modified': lastModifiedDate.toUTCString(),
        'Cache-Control': 'no-cache'
      }
    });
  }
// 添加2秒延迟
await new Promise(resolve => setTimeout(resolve, 2000));
  // 返回新数据
  return NextResponse.json(data, {
    headers: {
      'Last-Modified': lastModifiedDate.toUTCString(),
      'Cache-Control': 'no-cache'
    }
  });
}
