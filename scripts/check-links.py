"""Read-only availability check; HTTP success is not proof of guest document access."""
import json
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

root = Path(__file__).resolve().parent.parent
data = json.loads((root / 'content/portfolio.json').read_text(encoding='utf-8'))

def check(source):
    result = {'id': source['id'], 'url': source['url']}
    try:
        req = Request(source['url'], headers={'User-Agent': 'Mozilla/5.0 (portfolio link availability check)'})
        with urlopen(req, timeout=25) as response:
            result.update(status=response.status, final_url=response.url)
    except HTTPError as error:
        result.update(status=error.code, note='Access restriction, rate limit, or unavailable page; inspect manually.')
    except (URLError, TimeoutError) as error:
        result.update(status=None, note=str(error.reason if isinstance(error, URLError) else error))
    if any(host in source['url'] for host in ['notion.', 'figma.com']):
        result['access_limit'] = 'App shell / anti-bot behavior does not establish anonymous document access.'
    return result

results = list(ThreadPoolExecutor(max_workers=6).map(check, data['sources']))
(root / 'qa').mkdir(exist_ok=True)
(root / 'qa/links.json').write_text(json.dumps(results, indent=2), encoding='utf-8')
print(json.dumps({'checked':len(results), 'http_success':sum(r.get('status') == 200 for r in results), 'needs_review':[{k:r.get(k) for k in ['id','status','note']} for r in results if r.get('status') != 200]}, indent=2))
