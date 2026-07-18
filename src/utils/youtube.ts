// YouTube 링크에서 video id / 썸네일을 안전하게 추출한다.
// youtu.be/{id}, youtube.com/watch?v={id}, /embed/{id}, /shorts/{id} → id 반환.
// playlist?list=... 처럼 단일 영상 id 가 없는 경우엔 null (썸네일 없이 버튼만).

const ID_RE = /^[A-Za-z0-9_-]{11}$/

export function youTubeId(href: string): string | null {
  try {
    const u = new URL(href)
    const host = u.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      const id = u.pathname.slice(1).split('/')[0]
      return ID_RE.test(id) ? id : null
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      if (u.pathname === '/watch') {
        const v = u.searchParams.get('v')
        return v && ID_RE.test(v) ? v : null
      }
      if (
        u.pathname.startsWith('/embed/') ||
        u.pathname.startsWith('/shorts/') ||
        u.pathname.startsWith('/v/')
      ) {
        const id = u.pathname.split('/')[2]
        return id && ID_RE.test(id) ? id : null
      }
      // playlist 등 — 단일 영상 id 없음
      return null
    }

    return null
  } catch {
    return null
  }
}

export function youTubeThumb(href: string): string | null {
  const id = youTubeId(href)
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null
}
