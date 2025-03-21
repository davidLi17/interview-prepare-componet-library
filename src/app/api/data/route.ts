import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

/**
 * 测试数据对象
 * @type {{message: string, timestamp: string}}
 */
const data = {
  message: '这是一个测试数据',
  timestamp: new Date().toISOString()
};

/**
 * 生成ETag
 * @param {any} data - 需要生成ETag的数据
 * @returns {string} 返回base64编码的ETag字符串
 */
function generateETag(data: any): string {
  return `"${Buffer.from(JSON.stringify(data)).toString('base64')}"`;
}

/**
 * 检查资源是否发生变化
 * @param {string} etag - 当前资源的ETag
 * @param {string} [ifNoneMatch] - 请求头中的if-none-match值
 * @returns {boolean} 如果资源未修改返回true，否则返回false
 */
function checkIfNoneMatch(etag: string, ifNoneMatch?: string): boolean {
  return ifNoneMatch === etag;
}

/**
 * GET请求处理函数
 * @param {NextRequest} request - Next.js请求对象
 * @returns {Promise<NextResponse>} 返回NextResponse响应对象
 * @description 实现了基于ETag的缓存控制，如果资源未修改则返回304状态码
 */
export async function GET(request: NextRequest) {
  
  const headersList = await headers();
  const ifNoneMatch = headersList.get('if-none-match');
  const etag = generateETag(data);

  // 如果资源未修改，返回304
  if (ifNoneMatch && checkIfNoneMatch(etag, ifNoneMatch)) {
    return new NextResponse(null, {
      status: 304,
      headers: {
        'ETag': etag,
        'Cache-Control': 'no-cache'
      }
    });
  }
// 添加延迟
await new Promise(resolve => setTimeout(resolve, 2000));
  // 返回新数据
  return NextResponse.json(data, {
    headers: {
      'ETag': etag,
      'Cache-Control': 'no-cache'
    }
  });
}
