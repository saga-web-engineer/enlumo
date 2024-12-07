import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

// UTCプラグインを読み込み
dayjs.extend(utc);
// timezoneプラグインを読み込み
dayjs.extend(timezone);
// タイムゾーンのデフォルトをJST化
dayjs.tz.setDefault('Asia/Tokyo');

export default dayjs;
