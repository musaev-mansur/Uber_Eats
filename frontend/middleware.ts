import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Получаем путь
  const path = request.nextUrl.pathname
  
  // Защищенные маршруты (требуют авторизации)
  const protectedRoutes = ['/profile', '/basket', '/orders']
  
  // Проверяем, является ли маршрут защищенным
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  
  if (isProtectedRoute) {
    // В реальном приложении здесь должна быть проверка токена
    // Пока что просто разрешаем доступ
    return NextResponse.next()
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
