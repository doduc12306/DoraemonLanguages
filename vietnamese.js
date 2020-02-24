const currentLanguage = "english",
langCode = 'en-US'
c = require("../config.js"),
e = c.emojis,
l = c.links;
const { clearifyNumber } = require('../helpers/utils');

// This class is used to store languages strings

module.exports = class {

    constructor() {
		this.language = {

            PERM_LEVELS: [
                "User",
                "Moderator",
                "Administrator",
                "Founder",
                "Ultimate",
                "Bot owner"
            ],
            
            ERR_CMD_CLIENT_PERMISSIONS: (perms) => `${e.error} __**Missing permissions**__\n\nDoraemon cần các quyền sau để lệnh này hoạt động đúng: ${perms.map((p) => "`"+p+"`").join(", ")}`,
            ERR_CMD_USER_PERMISSIONS: (levelName, userLevel) => `${e.error} | Lệnh này yêu cầu mức độ quyền: \`${levelName}\` (bạn là: \`${userLevel}\`) !`,
            ERR_CMD_COOLDOWN: (time) => `${e.error} | Từ từ đã ! Đợi  **${this.convertMs(time*1000)}** sau khi sử dụng lệnh này !`,
            ERR_CMD_NSFW: `${e.error} | Lệnh này chỉ được thực hiện khi ở kênh NSFW !`,
            ERR_CMD_DISABLED: `${e.error} | Lệnh này hiện đang bị vô hiệu hóa!`,
            ERR_OCCURRED: `${e.error} | Có một lỗi đã xảy ra . Vui lòng thử lại sau vài phút!`,
            ERR_CMD_GUILDONLY: `${e.error} | Lệnh này không có hiệu lực trong tin nhắn riêng tư!`,
            ERR_CMD_MAINGUILDONLY: `${e.error} | Lệnh này không có hiệu lực bên ngoài máy chủ chính!`,
            ERR_CMD_INVALID_ARGS: (prefix, cmd) => `${e.error} | Hành động không hợp lệ . Type \`${prefix}help ${cmd}\` để biết thêm chi tiết!`,
            ERR_CMD_NOT_FOUND: (cmd) => `${e.error} | Lệnh \`${cmd}\` không hợp lệ`,
            ERR_CMD_DISABLED_CHANNEL: (cmd) => `${e.error} | Lệnh${cmd ? " `"+ cmd + "`" : "s"} đã bị vô hiệu hóa tại kênh này`,
            ERR_CMD_DISABLED_GUILD: (cmd) => `${e.error} | Lệnh${cmd ? " `"+ cmd + "`" : "s"} đã bị vô hiệu hóa tại server này`,
            ERR_CH_COOLDOWN: (time) => `${e.error} | Hey,bình tĩnh! Hãy đợi **${this.convertMs(time*1000)}** trước khi Chat tại **Channel** này!`,
            ERR_NEXTTURN: (username) => `${e.error} | Bình tĩnh **${username}**, đợi những người khác!`,
            ERR_INPUT_INVALID_TIME: `${e.error} | Thời gian nhập không hợp lệ! Ví dụ: \`3d4h5m6s\``,
            ERR_INPUT_INVALID_DATE: `${e.error} | Ngày nhập không hợp lệ! Ví dụ: \`2020-01-31 12:00:59\``,
            ERR_INPUT_INVALID_CHARACTER: `${e.error} | Nhân vật không hợp lệ`,
            ERR_INVALID_CHOICE: (options) => `${e.error} | Lựa chon không hợp lệ . Hãy thử ${options.map((p) => "`"+p+"`").join(", ")}`,
            ERR_CMD_NO_USER: `${e.error} | Không thể tìm được người dùng `,
            JSON_ERR_FORMAT: `${e.error} | Định dạng JSON không hợp lệ`,
            ERR_PERMISSION_LOWER_ROLE: `${e.error} __**Missing permissions**__\n\nI Cần quyền \`MANAGE_ROLES\` và vị trí role của **Doraemon** phải đủ cao để làm điều này!`,
            PREFIX_INFO: (prefix) => `${e.success} | Prefix hiện tại của server là  \`${prefix}\`!`,
            
            /* PING COMMAND */
            PING_DESCRIPTION: "Displays the bot latency!",
            PING_USAGE: "$ping",
            PING_EXAMPLES: "$ping",
            PING_WAIT: `${e.loading} | Pinging...`,
            PING_RESULT: (ms) => `${e.success} | Pong! Latency: \`${ms}\` ms!`,

            /* BUILD EMOJIS COMMAND */
            BUILD_EMOJIS_DESCRIPTION: "Automatically adds the emojis necessary for the bot to work properly and generates a configuration!",
            BUILD_EMOJIS_USAGE: "$build-emojis",
            BUILD_EMOJIS_EXAMPLES: "$build-emojis",
            BUILD_EMOJIS_IN_PROGRESS: `${e.success} | Adding emojis is in progress...-`,
            BUILD_EMOJIS_INFOS: `${e.success} | Copy and paste this into your configuration!`,

            /* HELP COMMAND */
            HELP_TITLE: "Commands List",
            HELP_SUBTITLE: (prefix) => `Use \`${prefix}help [command]\` để biết thêm chi tiết\nCần hỗ trợ? Hãy tham gia máy chủ của chúng tôi [Cat](${l.supportChannelInvite})`,
            HELP_HEADINGS: [
				"Command:",
				"Usage:",
				"Examples:",
				"Group:",
				"Description:",
				"Aliases:",
                "User permissions:",
                "Bot permissions:"
            ],
            HELP_NO_ALIASES: "No alias.",
            HELP_ERR_CMD_NOT_FOUND: (cmd) => `${e.error} | Lệnh \`${cmd}\` là lệnh gì dị chưa thấy bao giờ -.-!`,
            HELP_DESC_SUBCMD: (prefix, cmd) => `sử dụng \`${prefix}help ${cmd} [subcommand]\` để biết thêm chi tiết`,

            /* COINFLIP COMMAND */
            COINFLIP_DESCRIPTION: "Xóc đĩa cổ điển (chọn: \`t\`, \`s\`) và chế độ mở rộng (chọn: `0s`-`4s`, `0t`-`4t`)",
            COINFLIP_USAGE: "$xocdia [bet] (chọn)",
            COINFLIP_EXAMPLES: "$xocdia 500\n$xocdia all t\n$xocdia all 3t",
            COINFLIP_NAME_CLASSIC: "Xóc đĩa cổ điển",
            COINFLIP_NAME_EXTENDED: "Xóc đĩa mở rộng",
            COINFLIP_BET_DESCRIPTION: (username, amount, choice) => `**${username}** đặt **${clearifyNumber(amount)} catnip** vào **${choice}**`,
            COINFLIP_FLIPPING: "Xóc Xóc <a:CAT_hyper:588594746176307200>",
            COINFLIP_CHOICES_RESULT: (CHOICES, winChoices) => `Result: [**${CHOICES[winChoices[0]]}**] [**${CHOICES[winChoices[1]]}**] [**${CHOICES[winChoices[2]]}**] [**${CHOICES[winChoices[3]]}**]`,
            COINFLIP_FINAL_RESULT: (username, amount, choice, reward) => `**${username}** đặt **${clearifyNumber(amount)} catnip** vào **${choice.toUpperCase()}**` + (reward > 0 ? ` và thắng **${clearifyNumber(reward)} catnip**` : " Và thua hết :("),

            /* CATNIP */
            CATNIP_ERR_NOT_ENOUGH: `${e.error} | Không đủ catnip`,
            ERR_INVALID_AMOUNT: `${e.error} | Số catnip không hợp lệ`,
            NIP_DESCRIPTION: "kiểm tra số catnip của bạn",
            NIP_USAGE: "$nip",
            NIP_EXAMPLES: "$nip",
            NIP_CHECK: (username, amount) => `**${username}**, Bạn có **${clearifyNumber(amount)} catnip**`,

            /* DAILY */
            DAILY_DESCRIPTION: "get high và nhận được catnip mỗi 12 tiếng",
            DAILY_USAGE: "$high",
            DAILY_EXAMPLES: "$high",
            DAILY_TITLE: (username) => `${username}, let's high`,
            DAILY_TOTAL_RECEIVED: (amount) => `Bạn đã nhận được tổng cộng **${clearifyNumber(amount)} catnip**`,
            DAILY_HIGH_STREAK: (streak) =>  `Chuỗi **High** (${streak})`,
            DAILY_HIGH_NEXT: (amount) => `Lần **High** tiếp theo: ${clearifyNumber(amount)} catnip`,
            DAILY_VOTE_STREAK: (streak) =>  `Chuỗi **Vote** (${streak})`,
            DAILY_VOTE_NEXT: (min, max) => `Lần **Vote** tiếp theo: ngẫu nhiên ${clearifyNumber(min)} - ${clearifyNumber(max)} catnip (+250 every 5 votes)`,
            DAILY_VOTE_TIP: `Vote **Doraemon** on __**[link](${l.botVote})**__ (mỗi 12 tiếng) để nhận được nhiều phần thưởng hấp dẫn`,
            DAILY_PREMIUM: (point) => `Premium (${point} points)`,
            DAILY_PREMIUM_COUNT: (bonus) => `Bonus: ${clearifyNumber(bonus)} catnip`,

            /* GIVE */
            GIVE_DESCRIPTION: "chuyển catnip",
            GIVE_USAGE: "$give [@user] [amount]",
            GIVE_EXAMPLES: "$give @Komatsu 100",
            GIVE_ERR_NO_USER: `${e.error} | Thiếu người nhận`,
            GIVE_ERR_NO_AMOUNT: `${e.error} | Thiếu số catnip `,
            GIVE_ERR_USER_BOT: `${e.error} | Không thể gửi catnip cho bot`,
            GIVE_ERR_USER_SELF: `${e.error} | Không thể gửi catnip cho bản thân`,
            GIVE_INFO: (from, to, amount) => `**${to}** nhận được **${clearifyNumber(amount)} catnip** từ **${from}**`,

            /* ADD */
            ADD_DESCRIPTION: "add catnip",
            ADD_USAGE: "$add [@user> <amount]",
            ADD_EXAMPLES: "$add @Komatsu 100",
            ADD_ERR_NO_USER: `${e.error} | Missing user`,
            ADD_ERR_NO_AMOUNT: `${e.error} | Missing catnip amount`,
            ADD_ERR_USER_BOT: `${e.error} | Cannot add catnip to bot`,
            ADD_INFO: (from, to, amount) => `**${to}** has been added **${clearifyNumber(amount)} catnip** by **${from}**`,

            /* TAKE */
            TAKE_DESCRIPTION: "take catnip",
            TAKE_USAGE: "$take [@user] [amount]",
            TAKE_EXAMPLES: "$take @Komatsu 100",
            TAKE_ERR_NO_USER: `${e.error} | Missing user`,
            TAKE_ERR_NO_AMOUNT: `${e.error} | Missing catnip amount`,
            TAKE_ERR_USER_BOT: `${e.error} | Cannot take catnip from bot`,
            TAKE_INFO: (from, to, amount) => `**${to}** has been taken **${clearifyNumber(amount)} catnip** by **${from}**`,
        
            /** LEADERBOARD */
            LEADERBOARD_DESCRIPTION: " Bảng xếp hạng toàn hệ thống : catnip, battle streak, power,...",
            LEADERBOARD_USAGE: "$leaderboard [category] [limit]",
            LEADERBOARD_EXAMPLES: "$lb catnip 10",
            LEADERBOARD_CATNIP_TITLE: "Bảng xếp hạng toàn hệ thống ",
            LEADERBOARD_FOOTER: (rank) => `Rank của bạn: ${rank}`,
            /**
            * Feature Channels
            */
            XINH_DESCRIPTION_PROVIDED: `Source for \`girl\` command`,
            ZAI_DESCRIPTION_PROVIDED: `Source for \`boy\` command`,
            MEO_DESCRIPTION_PROVIDED: `Source for \`meo\` command`,
            MEME_DESCRIPTION_PROVIDED: `Source for \`meme\` command`,
            SEXY_DESCRIPTION_PROVIDED: `Source for \`sexy\` command`,
            FOOD_DESCRIPTION_PROVIDED: `Source for \`food\` command`,

            BANK_DESCRIPTION_PROVIDED: "tự động chuyển cowoncy sang catnip",
            BANK_EXCHANGE_SUCCESS: (username, amount) => `${e.success} | **${username}**, Đổi thành công. Hiện tại bạn có **${clearifyNumber(amount)} catnip**`,
            CHARWORDCHAIN_DESCRIPTION_PROVIDED: "Word chain | Character connect",
            WORDWORDCHAIN_DESCRIPTION_PROVIDED: "Word chain | Word connect",
            WORDCHAIN_ERR_INVALIDWORD: (con) => `${e.error} | Từ tiếp theo bắt đầu với **${con}**! sử dụng \`> <content>\` để nối tiếp.`,
            WORDCHAIN_ERR_NEXTTURN: (username) => `${e.error} | **${username}** từ từ , đợi những người khác! Sử dụng \`> <content>\` để nối tiếp.`,
            ONEWORDSTORY_DESCRIPTION_PROVIDED: "One-word story",
            TWOWORDSTORY_DESCRIPTION_PROVIDED: "Two-word story",

            /* CHANNEL */
            CHANNEL_DESCRIPTION: "Cài đặt tính năng riêng cho kênh",
            CHANNEL_USAGE: "$channel []",
            CHANNEL_EXAMPLES: "$channel []",
            CHANNEL_MEDIA_DESCRIPTION: "Đặt kênh hiện tại thành kênh media",
            CHANNEL_MEDIA_USAGE: "$channel media [tính năng]",
            CHANNEL_MEDIA_EXAMPLES: "$cn media xinh/zai/meo/food/meme/sexy/art/gif/bank",
            CHANNEL_CHARWORDCHAIN_DESCRIPTION: "đặt kênh hiện tại thành kênh nối chữ . Ví dụ: `hello - object - teacher - ...`",
            CHANNEL_CHARWORDCHAIN_USAGE: "$channel cwc",
            CHANNEL_CHARWORDCHAIN_EXAMPLES: "$cn cwc",
            CHANNEL_CONFESSIONPENDING_DESCRIPTION: "Đặt kênh hiện tại thành kênh cfs chờ",
            CHANNEL_CONFESSIONPENDING_USAGE: "$channel cfsp",
            CHANNEL_CONFESSIONPENDING_EXAMPLES: "$cn cfsp ",
            CHANNEL_CONFESSION_DESCRIPTION: "Đặt kênh hiện tại làm kênh Confession và thiết lập \`key\`. members sẽ gửi tin nhắn riêng cho bot \`keycfs [content]\` để gửi confession!",
            CHANNEL_CONFESSION_USAGE: "$channel cfs [key]",
            CHANNEL_CONFESSION_EXAMPLES: "$cn cfs drm ",
            CHANNEL_COOLDOWN_DESCRIPTION: "Đặt thời gian chờ cho kênh hiện tại",
            CHANNEL_COOLDOWN_USAGE: "$channel cooldown [thời lượng]",
            CHANNEL_COOLDOWN_EXAMPLES: "$cn cd 5s",
            CHANNEL_COUNTING_DESCRIPTION: "đặt kênh hiện tại thành kênh đếm số",
            CHANNEL_COUNTING_USAGE: "$channel counting",
            CHANNEL_COUNTING_EXAMPLES: "$cn cnt",
            CHANNEL_INFO_DESCRIPTION: "Show Thông tin của channel",
            CHANNEL_INFO_USAGE: "$channel info",
            CHANNEL_INFO_EXAMPLES: "$cn i",
            CHANNEL_ONEWORDSTORY_DESCRIPTION: "Đặt kênh hiện tại thành kênh một chữ",
            CHANNEL_ONEWORDSTORY_USAGE: "$channel ows",
            CHANNEL_ONEWORDSTORY_EXAMPLES: "$cn ows",
            CHANNEL_RESET_DESCRIPTION: "đặt lại tính năng của kênh",
            CHANNEL_RESET_USAGE: "$channel reset",
            CHANNEL_RESET_EXAMPLES: "$cn rs",
            CHANNEL_TWOWORDSTORY_DESCRIPTION: "Đặt kênh hiện tại thành kênh 2 chữ",
            CHANNEL_TWOWORDSTORY_USAGE: "$channel tws",
            CHANNEL_TWOWORDSTORY_EXAMPLES: "$cn tws",
            CHANNEL_VOICECHANNELCREATOR_DESCRIPTION: "Đặt voice hiện tại thành `kênh tự động tạo voice`",
            CHANNEL_VOICECHANNELCREATOR_USAGE: "$channel vcc",
            CHANNEL_VOICECHANNELCREATOR_EXAMPLES: "$cn vcc",
            CHANNEL_WORDWORDCHAIN_DESCRIPTION: "Đặt kênh hiện tại thành kênh nối từ",
            CHANNEL_WORDWORDCHAIN_USAGE: "$channel wwc",
            CHANNEL_WORDWORDCHAIN_EXAMPLES: "$cn wwc",

            CHANNEL_RESET_SUCCESS: `${e.success} | Kênh đã được đưa về mặc định!`,
            CHANNEL_ERR_INVALID_FEATURE: (FEATURES) => `${e.error} | Tính năng không hợp lệ! Thử ${FEATURES.map((f) => "`"+f+"`").join(" ")}`,
            CHANNEL_ERR_INVALID_FIELD: (FIELDS) => `${e.error} | Ký tự không hợp lệ! Thử ${FIELDS.map((f) => "`"+f+"`").join(" ")}`,
            CHANNEL_SUCCESS: (field, feature) => `${e.success} | Kênh đã được đặt từ **${field}** thành **${feature}**`,
            CHANNEL_ERR_USER_PERMISSIONS: `${e.error} | Bạn không có quyền cài đặt kênh hoặc tính năng!`,
            CHANNEL_ERR_UNSET_NOT_MATCH: (current, unset) => `${e.error} | Tính năng của kênh là \`${current}\` không \`${unset}\`. Thử Lệnh \`reset\` để đặt lại kênh!`,
            CHANNEL_ERR_SET_OVERWRITE: (feature) => `${e.error} | Tính năng riêng của kênh là \`${feature}\`. Hãy thử \`reset\` trước!`,
            CHANNEL_COOLDOWN_SUCCESS: (time) => `${e.success} | Thời gian chờ của kênh là  **${this.convertMs(time)}**!`,

            /* CONFESSION */
            CONFESSION_DESCRIPTION_PROVIDED: `Kênh confession`,
            CONFESSION_ERR_INVALID_KEY_CHAR: `${e.error} | Từ khóa không hợp lệ. Hãy thử một từ với các ký tự Latin!`,
            CONFESSION_ERR_KEY_EXIST: (key) => `${e.error} | Từ khóa \`${key}\` đã tồn tại . Thử một từ khác!`,
            CONFESSION_SUCCESS: (key) => `${e.success} | Keenhh đã được cài đặt thành  **Confession** với từ khóa \`${key}\``, 
            CONFESSIONPENDING_SUCCESS: `${e.success} | Kênh đã được cài đặt thành server's **Confession pending**`,
            CONFESSION_ERR_MISSING_CONTENT: `${e.error} | Thiếu nội dung!`,
            CONFESSION_ERR_KEY_NOT_FOUND: (key) => `${e.error} | Key \`${key}\` không tồn tại.`,
            CONFESSION_ERR_NOT_MEM: (guild) => `${e.error} | Bạn không phải là thành viên của server **${guild.name}**`,
            CONFESSION_ERR_MEMBER_MISSING_READ_PERM: (channel) => `${e.error} | Bạn không có quyền gửi tin nhắn vào **${channel}**`,
            CONFESSION_WAIT_PENDING: (channel) => `${e.success} | confession của bạn đang chờ được duyệt trước khi gửi vào  **${channel}**`,
            CONFESSION_REPLY_ERR_INVALID_COUNT: (count) => `${e.error} | Số cofession không hợp lệ: **${count}**`,
            CONFESSION_REPLY_ERR_NOT_PRE: `Reply confession chỉ hoạt động với **Guild Premium**`,
            CONFESSION_SEND_ERR_ATTACH_NOTPRE: `Attach images chỉ hoạt động với **Guild Premium**`,

            /** COUNTING */
            COUNTING_DESCRIPTION_PROVIDED: `Kênh đếm số`,
            COUNTING_ERR_INVALID_MSG: (number) => `${e.error} | Số tiếp theo là \`${number}\` !`,
            COUNTING_TOPIC: (number) => `Số tiếp theo là ${number}`,
                        
            /* LANGUAGE */
            LANGUAGE_DESCRIPTION: "Cài đặt ngôn ngữ cho máy chủ",
            LANGUAGE_USAGE: "$language\n$language [language]\n$language list",
            LANGUAGE_EXAMPLES: "$language english",
            LANGUAGE_INFO: `Ngôn ngữ hiện tại của máy chủ là  \`${this.getLang()}\`!`,
            LANGUAGE_ERR_INVALID_LANG: (lang) => `${e.error} | Không tìm thấy ngôn ngữ \`${lang}\`! `,
            LANGUAGE_SUCCESS: (lang) => `${e.success} | Ngôn ngữ của máy chủ đã được đặt là \`${lang}\`!`,

            /* LIXI */
            LIXI_DESCRIPTION: "Cho đi và nhận lại. Thêm `rd` để ngẫu nhiên, `s` để cho chỉ máy chủ hiện tại ",
            LIXI_USAGE: "$lixi list\n$lixi take\n$lixi give [amount] (boxes) (random) (server only)",
            LIXI_EXAMPLES: "$lixi give 1000 10\n$lixi give 5000 rd\n$lixi give 3000 s",
            LIXI_ERR_INVALID_BOX_OR_AMOUNT: `${e.error} | Hộp quà hoặc số catnip không hợp lệ !`,
            LIXI_ERR_INVALID_BOXES: (max) => `${e.error} | Hộp quà tối đa là **${max}** Hộp`,
            LIXI_ERR_INVALID_RANDOM_AMOUNT: (min) => `${e.error} | Số catnip ngẫu nhiên nhỏ nhất là : **${clearifyNumber(min)} catnip**`,
            LIXI_ERR_INVALID_BOX_AMOUNT: (min) => `${e.error} | Số catnip nhỏ nhất trong mỗi hộp quà là : **${clearifyNumber(min)} catnip**`,
            LIXI_GIVE_SUCCESS: (turns, total) => `${e.success} | Bạn đã cho đi **${turns}** hộp quà với tổng số catnip là **${clearifyNumber(total)} catnip**`,
            LIXI_TAKE_SUCCESS: (num, total, givers) => `${e.success} | bạn đã lấy được **${num}** hộp quà với tổng số catnip là  **${clearifyNumber(total)} catnip** từ  **Lixi** của ${givers}`,
            LIXI_ERR_NO_BOX: `${e.error} | Hết lì xì rồi , thêm ngay nàoo :CAT_moneyyyy: !`,
            LIXI_ERR_ALL_TAKEN: `${e.error} | Bạn không thể lấy thêm , Hãy cho đi một ít!`,

            /** VOICECHANNEL */
            VOICECHANNEL_DESCRIPTION: "Kênh Voice Tự Động",
            VOICECHANNEL_ERR_NOT_IN_VOICE: `${e.error} | Hãy kết nối với Kênh Voice rồi thử lại!`,
            VOICECHANNEL_CREATOR_SUCCESS: (channel) => `${e.success} | Kênh **${channel}** đã được đặt thành kênh \`voice channel creator\``,
            VOICECHANNEL_STABLE_SUCCESS: (channel) => `${e.success} | Kênh **${channel}** đã được đặt thành \`voice channel stable\``,
            
            VOICECHANNEL_CLAIM_SUCCESS: (user, channel) => `${e.voiceChannel} | **${user}** has claimed room **${channel}**`,
            VOICECHANNEL_CLAIM_DESCRIPTION: "Lấy quyền chủ phòng khi Host rời đi",
            VOICECHANNEL_CLAIM_USAGE: "$voice claim",
            VOICECHANNEL_CLAIM_EXAMPLES: "$vc c",
            VOICECHANNEL_INFO_DESCRIPTION: "Thông tin của room",
            VOICECHANNEL_INFO_USAGE: "$voice claim",
            VOICECHANNEL_INFO_EXAMPLES: "$vc i",
            VOICECHANNEL_ALLOW_DESCRIPTION: "Cho phép người dùng kết nối",
            VOICECHANNEL_ALLOW_USAGE: "$voice allow [@user]",
            VOICECHANNEL_ALLOW_EXAMPLES: "$vc a @komatsu#7447 ",
            VOICECHANNEL_DENY_DESCRIPTION: "Kick người dùng khỏi phòng",
            VOICECHANNEL_DENY_USAGE: "$voice deny [@user]",
            VOICECHANNEL_DENY_EXAMPLES: "$vc d @komatsu#7447 @ustamok#3010",
            VOICECHANNEL_LIMIT_DESCRIPTION: "Chỉnh giới hạn người dùng trong voice , dùng \`0\` để bỏ giới hạn room .",
            VOICECHANNEL_LIMIT_USAGE: "$voice limit [quantity]",
            VOICECHANNEL_LIMIT_EXAMPLES: "$vc lm 5",
            VOICECHANNEL_LOCK_DESCRIPTION: "Khóa voice và cho phép tất cả người dùng đang ở trong room ",
            VOICECHANNEL_LOCK_USAGE: "$voice lock",
            VOICECHANNEL_LOCK_EXAMPLES: "$vc l",
            VOICECHANNEL_UNLOCK_DESCRIPTION: "Mở Khóa room",
            VOICECHANNEL_UNLOCK_USAGE: "$voice unlock",
            VOICECHANNEL_UNLOCK_EXAMPLES: "$vc ul",
            VOICECHANNEL_NAME_DESCRIPTION: "Đổi tên room",
            VOICECHANNEL_NAME_USAGE: "$voice name [new name]",
            VOICECHANNEL_NAME_EXAMPLES: "$vc n Let's talk",
            VOICECHANNEL_RESET_DESCRIPTION: "Đặt lại room",
            VOICECHANNEL_RESET_USAGE: "$voice reset",
            VOICECHANNEL_RESET_EXAMPLES: "$vc rs",
            VOICECHANNEL_SLEEP_DESCRIPTION: "Bật chế độ **Ngủ**",
            VOICECHANNEL_SLEEP_USAGE: "$voice sleep",
            VOICECHANNEL_SLEEP_EXAMPLES: "$vc s",
            VOICECHANNEL_WAKEUP_DESCRIPTION: "Tắt chế độ **Ngủ**",
            VOICECHANNEL_WAKEUP_USAGE: "$voice wakeup",
            VOICECHANNEL_WAKEUP_EXAMPLES: "$vc w",
            VOICECHANNEL_TRANSFER_DESCRIPTION: "Chuyển chủ phòng",
            VOICECHANNEL_TRANSFER_USAGE: "$voice transfer [@user]",
            VOICECHANNEL_TRANSFER_EXAMPLES: "$vc tf @komatsu7447",
            VOICECHANNEL_BLOCK_DESCRIPTION: "Chặn người dùng, tránh xem các kênh của họ và ngăn họ xem kênh của bạn khi bạn 'ẩn(softhide)' nó! ( chỉ dùng với ID)",
            VOICECHANNEL_BLOCK_USAGE: "$voice block [user]",
            VOICECHANNEL_BLOCK_EXAMPLES: "$vc bl 202381699164667913",
            VOICECHANNEL_UNBLOCK_DESCRIPTION: "Bỏ chặn người dùng",
            VOICECHANNEL_UNBLOCK_USAGE: "$voice unblock [user]",
            VOICECHANNEL_UNBLOCK_EXAMPLES: "$vc ubl 202381699164667913",
            VOICECHANNEL_HIDE_DESCRIPTION: "Ẩn kênh",
            VOICECHANNEL_HIDE_USAGE: "$voice hide",
            VOICECHANNEL_HIDE_EXAMPLES: "$vc h",
            VOICECHANNEL_SHOW_DESCRIPTION: "Hiện kênh",
            VOICECHANNEL_SHOW_USAGE: "$voice show",
            VOICECHANNEL_SHOW_EXAMPLES: "$vc sh",
            VOICECHANNEL_SOFTHIDE_DESCRIPTION: "Ẩn kênh , ngăn người dùng bị chặn mềm nhìn thấy kênh của bạn",
            VOICECHANNEL_SOFTHIDE_USAGE: "$voice softhide",
            VOICECHANNEL_SOFTHIDE_EXAMPLES: "$vc sfh",
            VOICECHANNEL_SOFTSHOW_DESCRIPTION: "Hiện kênh, Những người **bị chặn** cũng có thể thấy kênh của bạn!",
            VOICECHANNEL_SOFTSHOW_USAGE: "$voice softshow",
            VOICECHANNEL_SOFTSHOW_EXAMPLES: "$vc sfs",

            VOICECHANNEL_LIMIT_SUCCESS: (channel, limit) => `${e.voiceChannel} | **${channel}**'s giới hạn người dùng đã được đặt thành **${limit}**`,
            VOICECHANNEL_NO_LIMIT_SUCCESS: (channel) => `${e.voiceChannel} | **${channel}**'s đã bỏ giới hạn room!`,
            VOICECHANNEL_LOCK_SUCCESS: (channel) => `${e.voiceChannel} | **${channel}** đã khóa`,
            VOICECHANNEL_UNLOCK_SUCCESS: (channel) => `${e.voiceChannel} | **${channel}** đã mở khóa`,
            VOICECHANNEL_NAMED_SUCCESS: (channel) => `${e.voiceChannel} | Room named **${channel}**`,
            VOICECHANNEL_TRANSFER_SUCCESS: (user, channel) => `${e.voiceChannel} | **${user}** Đã trở thành chủ phòng `,
            VOICECHANNEL_ERR_TRANSFER_OUTSIDE: (user) => `${e.error} | **${user}** không có ở trong room!`,
            VOICECHANNEL_ERR_TRANSFER_SELF: `${e.loading} | Bạn không chể chuyển chủ phòng cho chính bản thân!`,
            VOICECHANNEL_ERR_TRANSFER_BOT: `${e.error} | Err... Đừng để Bot điều khiển bạn!!`,
            VOICECHANNEL_DENY_SUCCESS: (user, channel) => `${e.voiceChannel} | **${user}** đã bị chặn khỏi room **${channel}**`,
            VOICECHANNEL_UNDENY_SUCCESS: (user, channel) => `${e.voiceChannel} | **${user}** không còn bị chặn khỏi room **${channel}**`,
            VOICECHANNEL_ALLOW_SUCCESS: (user, channel) => `${e.voiceChannel} | **${user}** đã được cho phép kết nối với room **${channel}**`,
            VOICECHANNEL_RESET_SUCCESS: (channel) => `${e.voiceChannel} | **${channel}** đã được đặt lại`,
            VOICECHANNEL_SLEEP_SUCCESS: (channel) => `${e.voiceChannel} | **${channel}** Bật chế độ **Ngủ**`,
            VOICECHANNEL_WAKEUP_SUCCESS: (channel) => `${e.voiceChannel} | **${channel}** Tắt chế độ **Ngủ**`,
            VOICECHANNEL_BLOCK_ALREADY: (target) => `${e.error} | Bạn đã bị chặn **${target}** trước đó`,
            VOICECHANNEL_BLOCK_SUCCESS: (target) => `${e.voiceChannel} | bạn đã bị chặn tạm thời  **${target}**`,
            VOICECHANNEL_UNBLOCK_NOTBLOCK: (target) => `${e.error} | Bạn không còn bị chặn **${target}** `,
            VOICECHANNEL_UNBLOCK_SUCCESS: (target) => `${e.voiceChannel} | Bạn đã được bỏ chặn **${target}**`,
            VOICECHANNEL_ERR_NOT_VC: `${e.error} | Lệnh chỉ hoạt đông với \`Kênh voice tự động\``,
            VOICECHANNEL_ERR_TRANSFER_NOBODY: `${e.error} | Thiếu người dùng`,
            VOICECHANNEL_ERR_HOSTONLY: `${e.error} | Chỉ mình chủ phòng mới có thể sử dụng`,
            VOICECHANNEL_ERR_INVALID_LIMIT: `${e.error} | Giới hạn room phải từ \`1 đến 99\` hoặc \`0\` để bỏ giới hạn.`,
            VOICECHANNEL_ERR_HOST_EXISTS: `${e.error} | Phòng này đã có chủ!`,
            VOICECHANNEL_ERR_ALREADY_HOST: `${e.loading} | Bạn đang là chủ phòng!`,
            VOICHANNEL_ERR_MISSING_CATE_PERMS: `${e.error} | Thiếu quyền!\nCho Doraemon tất cả các quyền sau :  (\`Manage Channel\` and \`Manage Permission\`) với kênh **Creator channel**`,
            CHANNEL_VOICECHANNELCREATOR_ERR_MAX: (guild) => `${e.error} | Server **${guild}** đã đạt đến giới hạn Creator channels. Nâng cấp lên **Guild Premium** để sử dụng với không giới hạn!!`,
            CHANNEL_CONFESSION_ERR_MAX: (guild, cn) => `${e.error} | Server **${guild}** đã đạt đến giới hạn Confession channel (ID: ${cn}). Nâng cấp lên **Guild Premium** để sử dụng với không giới hạn!!`,

            /** LINKS */
            LINK_DESCRIPTION: "Các link hữu ích",
            LINK_USAGE: "$link",
            LINK_EXAMPLES: "$link",
            LINK_USEFUL_LINKS: "Here you are, some useful links",

            /** SAY */
            SAY_DESCRIPTION: "Chuyển nội dung đến các kênh . sử dụng `sayx` để xóa tin nhắn gốc!",
            SAY_USAGE: "$say [content]\n$say [#channel] content",
            SAY_EXAMPLES: "$say hello\n$say #chat hello\n$sayx #chat đoán xem aii ",
            SAY_ERR_PERM_CLIENT: (channel) => `${e.error} | Doraemon không có quyền gửi tin nhắn tại **${channel}**!`,
            SAY_ERR_PERM_USER: (channel) => `${e.error} | Bạn không có quyền gửi tin nhắn tại  **${channel}**!`,

            /** MUTE */
            MUTE_ERR_MANAGE_PERM: `${e.error} | Không thể mute người dùng (cần \`manage_channels\`)`,
            MUTE_SUCCESS: (user, time) => `${e.mute} | **${user}** đã bị **muted** khỏi kênh **${this.convertMs(time)}**`,
            UNMUTE_SUCCESS: (user) => `${e.unmute} | **${user}** đã được **unmuted**`,
            UNMUTE_ERR_NOT_MUTED: `${e.error} | Người dùng chưa bị Mute!`,

            /** STOP */
            STOP_DESCRIPTION: "Stop và disconnect bot khỏi voice channel",
            STOP_USAGE: "$stop",
            STOP_EXAMPLES: "$stop",
            STOP_ERR_IS_USING: `${e.error} | Ai đó đã sử dụng lênh này!`,

            /** SPEAK */
            SPEAK_DESCRIPTION: "**Chuyển văn bản thành lời nói** . sử dụng `speakx` để xóa tin nhắn gốc",
            SPEAK_USAGE: "$speak [content]",
            SPEAK_EXAMPLES: "$s hello, it's me\n$sx Hello , Đoán xem aii",
            SPEAK_ERR_IS_SPEAKING: `${e.error} | Đang gáy mà đợi chút `,
            SPEAK_ERR_CHANNEL_NOT_FOUND: `${e.error} | Không thể tìm thấy kênh thoại `,
            SPEAK_ERR_USER_MISSING_PERM_MOVE: `${e.error} | Bạn cần quyền \`MOVE_MEMBERS\` để sử dụng 'speak' ở các kênh khác!`,
            SPEAK_ERR_NOT_VIEWABLE: (channel) => `${e.error} | Thiếu quyền \`VIEW_CHANNEL\` với kênh **${channel}**`,
            SPEAK_ERR_NOT_JOINABLE: (channel) => `${e.error} | Bot không thể vào kênh **${channel}**`,
            SPEAK_ERR_NOT_SPEAKABLE: (channel) => `${e.error} | Doraemon không thể nói tại  **${channel}**`,
            SPEAK_ERR_TOO_LONG: (max) => `${e.error} | Doraemon không thể nói quá **${max}** từ ! Nâng cấp lên premium để bỏ giới hạn !`,

            /** LEVEL */
            LEVEL_DESCRIPTION: "Level, rank, rewards",
            LEVEL_REWARD_DESCRIPTION: "Add/remove level reward as role",
            LEVEL_REWARD_USAGE: "$level reward add [@role] [level] (description)\n$level reward remove [@role]",
            LEVEL_REWARD_EXAMPLES: "$lvl rw add @starter 5 Change nickname is unlocked\n$lvl rw remove @starter",
            LEVEL_DISABLE_DESCRIPTION: "Disable level for server",
            LEVEL_DISABLE_USAGE: "$level disable",
            LEVEL_DISABLE_EXAMPLES: "$lvl disable",
            LEVEL_ENABLE_DESCRIPTION: "Enable level for server",
            LEVEL_ENABLE_USAGE: "$level enable",
            LEVEL_ENABLE_EXAMPLES: "$lvl enable",
            LEVEL_MESSAGE_DESCRIPTION: "Edit level-up message",
            LEVEL_MESSAGE_USAGE: "$level message [content]",
            LEVEL_MESSAGE_EXAMPLES: "$lvl msg Congratz {user}, you've reached level {level}!",
            LEVEL_NOXP_DESCRIPTION: "Set no-xp role",
            LEVEL_NOXP_USAGE: "$level noxp [@role]",
            LEVEL_NOXP_EXAMPLES: "$lvl noxp @No-xp",
            LEVEL_RESET_DESCRIPTION: "Reset members xp",
            LEVEL_RESET_USAGE: "$level reset all\n$lvl reset [@user]",
            LEVEL_RESET_EXAMPLES: "$lvl rs all\n$lvl rs @komatsu#7447 @ustamok#3010",
            LEVEL_SETXP_DESCRIPTION: "Custom channel xp range. Use `--g` for server custom",
            LEVEL_SETXP_USAGE: "$level setxp (--g) [min] [max]",
            LEVEL_SETXP_EXAMPLES: "$level setxp 10 20\n$level setxp --g 10 20",
            LEVEL_UPDATE_DESCRIPTION: "Update missing role reward for members",
            LEVEL_UPDATE_USAGE: "$level update",
            LEVEL_UPDATE_EXAMPLES: "$lvl update",
            LEVEL_LEADERBOARD_DESCRIPTION: "Show leaderboard",
            LEVEL_LEADERBOARD_USAGE: "$level leaderboard",
            LEVEL_LEADERBOARD_EXAMPLES: "$lvl lb",
            LEVEL_RANK_DESCRIPTION: "Check rank",
            LEVEL_RANK_USAGE: "$level rank\n$level rank [user]",
            LEVEL_RANK_EXAMPLES: "$lvl rank\n$lvl rank 436520860254470156",
            LEVEL_REWARDS_DESCRIPTION: "Show rewards",
            LEVEL_REWARDS_USAGE: "$level rewards",
            LEVEL_REWARDS_EXAMPLES: "$lvl rws",
            LEVEL_INFO_DESCRIPTION: "Show level settings",
            LEVEL_INFO_USAGE: "$level info",
            LEVEL_INFO_EXAMPLES: "$lvl i",
            LEVEL_TOGGLEREMOVEROLE_DESCRIPTION: `Toggle remove lower role rewards`,
            LEVEL_TOGGLEREMOVEROLE_USAGE: "$level toggleremoverole",
            LEVEL_TOGGLEREMOVEROLE_EXAMPLES: "$lvl trr",

            LEVEL_TOGGLEREMOVEROLE_SUCCESS: (newState) => `${e.success} | Đã loại bỏ các role thấp hơn : **${newState}**`,
            LEVEL_ERR_REWARD_INVALID: "Level reward không hợp lệ",
            LEVEL_ERR_REWARD_ROLE_NOT_FOUND: (key) => `Role với ID \`${key}\` Không còn tồn tại.\nĐang gỡ các phần thưởng cho bạn...`,
            LEVEL_ERR_ADDROLE_PERMISSION: (role, user, guild) => `Doraemon không đủ quyền để gắn **${role}** cho **${user}** tại **${guild}**.`,
            LEVEL_UP_TITLE: "LEVEL UP!",
            LEVEL_FIX_TITLE: "LEVEL FIX!",
            LEVEL_UP_DESC: (member, lvl) => `**${member}** đã lên cấp **${lvl}** cố gắng cào phím để nhận thêm nhiều phần thưởng hấp dẫn hơn nha!`,
            LEVEL_LEADERBOARD_TITLE: (guild) => `${guild}'s Level Leaderboard`,
            LEVEL_REWARDS_TITLE: (guild) => `${guild}'s Level Rewards`,
            LEVEL_INFO_TITLE: (guild) => `${guild}'s Level Info`,
            LEVEL: "Level",
            LEVEL_GENERAL_XP: "Exp chung",
            LEVEL_CUSTOM_XP: "exp custom",
            LEVEL_MESSAGE_ERR_TOOLONG: (limit) => `${e.error} | Tin nhắn quá dài. tối đa: \`${limit}\` từ!`,
            LEVEL_MESSAGE_SUCCESS: (guild) => `${e.success} | **${guild}**'s level-up message updated!`,
            LEVEL_REWARD_ERR_INVALID_LEVEL: `${e.error} | Level không khả dụng!`,
            LEVEL_REWARD_ADD_SUCCESS: (role, level, desc) => `${e.success} | Reward added\nLevel: **${level}**\nRole: **${role}**\nDescription: ${desc}`,
            LEVEL_REWARD_ADD_ERR_EXIST: `${e.error} | Role đã có phần thưởng!`,
            LEVEL_REWARD_REMOVE_SUCCESS: `${e.success} | phần thưởng đã bị loại bỏ!`,
            LEVEL_REWARD_REMOVE_ERR_NOT_EXIST: `${e.error} | Role không phải là một phần thưởng!`,
            LEVEL_NOXP_ROLE: "No-xp Role",
            LEVEL_ENABLE_SUCCESS: (guild) => `${e.success} | Cho phép level tại  **${guild}**`,
            LEVEL_DISABLE_SUCCESS: (guild) => `${e.success} | Vô hiệu hóa level tại  **${guild}**`,
            LEVEL_ENABLE_ALREADY: `${e.error} | Level đã được cho phép tại máy chủ này!`,
            LEVEL_DISABLE_ALREADY: `${e.error} | Level đã bị vô hiệu hóa tại máy chủ này!`,
            LEVEL_RESET_MEMBERS_SUCCESS: (members) => `${e.success} | Exp của ${members} đã được đặt lại về 0`,
            LEVEL_RESET_SERVER_CONFIRM: (guild) => `${e.loading} | Bạn có chắc muốn đặt lại **${guild}**'s levels?`,
            LEVEL_RESET_SERVER_SUCCESS: (guild) => `${e.success} | **${guild}**'s level đã được reset!`,
            LEVEL_SETXP_ERR_OUTRANGE: (min, max) => `${e.error} | Số nhỏ nhất, số to nhất không hợp lệ (\`${min} - ${max}\`)`,
            LEVEL_SETXP_RANGE_SUCCESS: (channels, min, max) => `${e.success} | Đã đặt exp tùy chỉnh của **${channels}** là \`${min} - ${max}\``,
            LEVEL_NOXP_SUCCESS: (role) => `${e.success} | ${role} đã được đặt thành no-xp role`,
            LEVEL_BONUS_CATNIP: (amount) => `Bonus: **${clearifyNumber(amount)} catnip**`,

            /** GTN */
            GTN_DESCRIPTION: "Đoán số! Ba cấp độ gợi ý xuất hiện ngẫu nhiên. Khi chế độ tự động được bật, chỉ cần nhập số để đoán.",
            GTN_USAGE: "$gtn auto\n$gtn [number]\n$gtn info",
            GTN_EXAMPLES: "$gtn auto (toggle auto mode)\n$gtn 50\n50 (in auto-mode)\n$gtn info",
            GTN_WIN: (user, reward) => `BINGOOOOOOOOO!!!! Chúc mừng **${user}** đã đoán đúng số` + (reward ? ` và nhận được **${clearifyNumber(reward)} catnip**` : '.'),
            GTN_TOGGLE_AUTOMODE: (auto) => `${e.success} | GTN auto: **${auto ? 'ON' : 'OFF'}**`,
            GTN_ERR_OUTTURN: `${e.error} | Bạn đã hết lượt , hãy đợi các game tiếp theo!`,
            GTN_HINT_LVL: (level) => `Gợi ý cấp **${level}**`,
            GTN_HINT_LVL_HIDDEN: (level) => `Gợi ý cấp **${level}** đã ẩn`,
            GTN_HINT_LVL_1: (number, key) => [
                `Số cần tìm là \`${(key % 2) ? 'lẻ' : 'chẵn'}\``, 
                `Số cần tìm \`${(number < key) ? 'Lớn hơn' : 'Không lớn '}\` hơn \`${number}\``,
                `Số cần tìm \`${(number < key) ? 'Lớn hơn' : 'không lớn '}\` hơn \`${number}\``,
            ],
            GTN_HINT_LVL_2: (keyS, hintDigit, digitsSum) => [
                `Số cần tìm có một số là \`${hintDigit}\``, 
                `Tổng của tất cả số cần tìm là \`${digitsSum}\``,
                `Số cần tìm có \`${keyS.length}\` số `,
                `Số đầu tiên là \`${keyS.slice(0, 1)}\``,
                `Số cuối cùng là \`${keyS.slice(-1)}\``
            ],
            GTN_HINT_LVL_3: (numbers) => [`Là tập hợp của các số: **${numbers}**`],

            /** BAUCUA */
            BAUCUA_DESCRIPTION: "Game Baucua. Chọn: `tom`, `ga`, `nai`, `ca`, `bau`, `cua`",
            BAUCUA_USAGE: "$baucua [đặt] (chọn)",
            BAUCUA_EXAMPLES: "$bc 5000\n$bc all tom",
            BAUCUA_START_TITLE: "Baucua bắt đầu",
            BAUCUA_COUNTDOWN: (time) => `kết thúc vào ${this.convertMs(time)}`,
            BAUCUA_END_TITLE: "Baucua Ended",
            BAUCUA_BET_DESCRIPTION: (user, amount, choice) => `**${user}** đã đặt **${clearifyNumber(amount)} catnip** vào **${choice}**`,
            BAUCUA_WIN_DESCRIPTION: (user, amount) => `${user} thắng **${clearifyNumber(amount)} catnip**`,

            /** BLACKJACK */
            BLACKJACK_DESCRIPTION: "Xì Dách PvP",
            BLACKJACK_USAGE: "",
            BLACKJACK_EXAMPLES: "",
            BLACKJACK_JOIN_DESCRIPTION: "Vào Game",
            BLACKJACK_JOIN_USAGE: "$blackjack join [ID]",
            BLACKJACK_JOIN_EXAMPLES: "$bj in 1011",
            BLACKJACK_LIST_DESCRIPTION: "Liệt kê các game **Xì Dách** đang chờ trong máy chủ",
            BLACKJACK_LIST_USAGE: "$blackjack list",
            BLACKJACK_LIST_EXAMPLES: "$bj ls",
            BLACKJACK_MINE_DESCRIPTION: "Liệt kê danh sách các game **Xì Dách** đang chờ của bạn",
            BLACKJACK_MINE_USAGE: "$blackjack mine",
            BLACKJACK_MINE_EXAMPLES: "$bj mine",
            BLACKJACK_NEW_DESCRIPTION: "Tạo game Xì dách mới",
            BLACKJACK_NEW_USAGE: "$blackjack new [bet]",
            BLACKJACK_NEW_EXAMPLES: "$bj n 5000",
            BLACKJACK_START_DESCRIPTION: "Bắt đầu game",
            BLACKJACK_START_USAGE: "$blackjack start [ID]",
            BLACKJACK_START_EXAMPLES: "$bj s 1011",
            BLACKJACK_INFO_DESCRIPTION: "Thông tin Game",
            BLACKJACK_INFO_USAGE: "$blackjack info [ID]",
            BLACKJACK_INFO_EXAMPLES: "$bj i 1011",
            BLACKJACK_LEAVE_DESCRIPTION: "Thoát game hiện tại",
            BLACKJACK_LEAVE_USAGE: "$blackjack leave [ID]",
            BLACKJACK_LEAVE_EXAMPLES: "$bj out 1011",

            BLACKJACK_JOIN_ERR_GAME_STARTED: `${e.error} | Game bắt đầu!`,
            BLACKJACK_TITLE: "Blackjack",
            BLACKJACK_LIST_TITLE: (guild) => `${guild}'s blackjack games`,
            BLACKJACK_MINE_TITLE: (user) => `${user}'s blackjack games`,
            BLACKJACK_ERR_GAME_NOT_FOUND: "Game không tồn tại",
            BLACKJACK_LIST_NO_GAME: ` Không có game đang chờ , hãy tạo game mới`,
            BLACKJACK_START_ERR_NOT_HOST: `Chỉ người tạo game mới có thể bắt đầu!`,
            BLACKJACK_START_ERR_ALONE: `Bạn không thể chơi game một mình!`,
            BLACKJACK_END: "Blackjack kết thúc!",
            BLACKJACK_START: "Blackjack bắt đầu!",
            BLACKJACK_RESULT_SUPER: "Supper Blackjack",
            BLACKJACK_RESULT_BLACKJACK: "Xì dách",
            BLACKJACK_RESULT_HIGH_FIVE: "Ngũ Linh",
            BLACKJACK_RESULT_BUST: "Quắc",
            BLACKJACK_HIT_OR_STAND: (hit, stand) => `React ${hit} Lấy thêm bài hoặc ${stand} để dừng`,
            BLACKJACK_YOUR_HAND: "Your hand",
            BLACKJACK_LEAVE: (user, id) => `${user} đã thoát game ID \`${id}\``, 
            BLACKJACK_NEW_ERR_MINBET: (min) => `${e.error} | cược nhỏ nhất: **${min} catnip**`,

            /** LIENG */
            LIENG_DESCRIPTION: "Liêng PvP",
            LIENG_USAGE: "",
            LIENG_EXAMPLES: "",
            LIENG_JOIN_DESCRIPTION: "Join game",
            LIENG_JOIN_USAGE: "$lieng join [ID]",
            LIENG_JOIN_EXAMPLES: "$l in 1011",
            LIENG_LIST_DESCRIPTION: "Danh sách các game **Liêng** đang chờ trong máy chủ",
            LIENG_LIST_USAGE: "$lieng list",
            LIENG_LIST_EXAMPLES: "$l ls",
            LIENG_MINE_DESCRIPTION: "Danh sách game **Liêng** đang chờ của bạn",
            LIENG_MINE_USAGE: "$lieng mine",
            LIENG_MINE_EXAMPLES: "$l mine",
            LIENG_NEW_DESCRIPTION: "Tạo game mới. thêm \`up\` sẽ tạo **Lieng To**",
            LIENG_NEW_USAGE: "$lieng new [bet]\n$lieng new [bet] up",
            LIENG_NEW_EXAMPLES: "$l n 5000\n$l n 5000 up",
            LIENG_START_DESCRIPTION: "Bắt đầu game",
            LIENG_START_USAGE: "$lieng start [ID]",
            LIENG_START_EXAMPLES: "$l s 1011",
            LIENG_INFO_DESCRIPTION: "Thông tin game",
            LIENG_INFO_USAGE: "$lieng info [ID]",
            LIENG_INFO_EXAMPLES: "$l i 1011",
            LIENG_LEAVE_DESCRIPTION: "Thoát game hiện tại",
            LIENG_LEAVE_USAGE: "$lieng leave [ID]",
            LIENG_LEAVE_EXAMPLES: "$l out 1011",
            LIENG_JOIN_ERR_GAME_STARTED: `${e.error} | Game started!`,
            LIENG_TITLE: "Lieng",
            LIENG_JOIN_ERR_GAME_STARTED: `${e.error} | Game bắt đầu!`,
            LIENG_TITLE: "Lieng",
            LIENG_LIST_TITLE: (guild) => `${guild}'s lieng games`,
            LIENG_MINE_TITLE: (user) => `${user}'s lieng games`,
            LIENG_ERR_GAME_NOT_FOUND: "Game không tồn tại",
            LIENG_LIST_NO_GAME: `Không có game đang chờ , hãy tạo game mới`,
            LIENG_START_ERR_NOT_HOST: `Chỉ người tạo game mới có thể bắt đầu!`,
            LIENG_START_ERR_ALONE: `Bạn không thể chơi game một mình!`,
            LIENG_END: "Lieng kết thúc",
            LIENG_START: "Lieng bắt đầu",
            LIENG_RESULT_TRIPLE: "Sáp",
            LIENG_RESULT_ROW: "Liêng",
            LIENG_RESULT_ROYAL: "Ảnh",
            LIENG_YOUR_HAND: "Bài của bạn",
            LIENG_LEAVE: (user, id) => `${user} Thoát game lieng ID \`${id}\``, 
            LIENG_NEW_ERR_MINBET: (min) => `${e.error} | cược nhỏ nhất: **${min} catnip**`,
            LIENG_SHUFFLING: `${e.loading} | Xáo bài các kiểu :>`,
            LIENG_UP_AWAIT: (game, user, min, max, time) => `**Lieng** | \`${game}\`\n${user}, Lượt của bạn\nNhập số catnip (nhỏ nhất: \`${clearifyNumber(min)}\`, lớn nhất: \`${clearifyNumber(max)}\`) to up or \`sur\` to surrender! (${time}s)`,
            LIENG_SUR: (user) => `**${user}** Bỏ bài`,
            LIENG_ABORT: (user) => `**${user}** Theo`,
            LIENG_UP_DESC: (user, amount) => `**${user}** tố thêm **${clearifyNumber(amount)}**`,

            /** AVATAR */
            AVATAR_DESCRIPTION: "Show user avatar",
            AVATAR_USAGE: "$avatar [search]",
            AVATAR_EXAMPLES: "$avt @komatsu#7447\n$avt komatsu\n$avt 436520860254470156\n$avt koma\n$avt 7447",
            AVATAR_SEARCH_TITLE: (key) => `Đang tìm : ${key}`,
            AVATAR_SEARCH_DESC: `Nhập số trước người dùng bạn muốn chọn`,

            /** INVISIBLE */
            INVISIBLE_DESCRIPTION: "Toggle invisible mode",
            INVISIBLE_USAGE: "$invisible",
            INVISIBLE_EXAMPLES: "$invi",

            /** INVISIBLE */
            PICK_DESCRIPTION: "Pick from options (serprate by `,`) or max",
            PICK_USAGE: "$pick [option_1, option_2,...]\n$pick [max]",
            PICK_EXAMPLES: "$pick a,b,c\n$pick 999",

            /** MUTE */
            MUTE_LOG: (user, tomute, time) => `**${user}** đã bị mute **${tomute}** trong **${this.convertMs(time)}**`,

            /** ITEM */
            ITEM_DESCRIPTION: "Items in shop (`Sxxx`) and inventory (`Uxxx`)",
            ITEM_CREATE_DESCRIPTION: "Create item",
            ITEM_CREATE_USAGE: "$item create [name]",
            ITEM_CREATE_EXAMPLES: "$item create orayaki",
            ITEM_EDIT_DESCRIPTION: "Edit item",
            ITEM_EDIT_USAGE: "$item edit [field] [value]",
            ITEM_EDIT_EXAMPLES: "$item edit price 5000",
            ITEM_DELETE_DESCRIPTION: "Delete item",
            ITEM_DELETE_USAGE: "$item delete [ID]",
            ITEM_DELETE_EXAMPLES: "$item del s001",
            ITEM_INFO_DESCRIPTION: "Item info",
            ITEM_INFO_USAGE: "$item info [ID]",
            ITEM_INFO_EXAMPLES: "$item info s001",
            ITEM_USE_DESCRIPTION: "Use item",
            ITEM_USE_USAGE: "$item use [ID] [quantity]",
            ITEM_USE_EXAMPLES: "$item use s001 4",
            ITEM_BUY_DESCRIPTION: "Buy item",
            ITEM_BUY_USAGE: "$buy [ID] [quantity]",
            ITEM_BUY_EXAMPLES: "$buy s001 5",
            ITEM_INVENTORY_DESCRIPTION: "Your items. Find all or match with `search`",
            ITEM_INVENTORY_USAGE: "$inventory (search)",
            ITEM_INVENTORY_EXAMPLES: "$inv\n$inv oraya",
            ITEM_SHOP_DESCRIPTION: "Shop items. Find all or match with `search`",
            ITEM_SHOP_USAGE: "$shop (search)",
            ITEM_SHOP_EXAMPLES: "$shop\n$shop oraya",

            ITEM_CREATE_ERR_EXIST: (name) => `${e.error} | Item **${name}** already exists!`,
            ITEM_CREATE_SUCCESS: (name, id) => `${e.success} | Added new item **${name}**, ID: ${id}`,
            ITEM_ERR_INVALID_ID: (id) => `${e.error} | Invalid item ID: ${id}`,
            ITEM_ERR_ID_NOT_FOUND: (id) => `${e.error} | No item found with ID: ${id}`,
            ITEM_DELETE_SUCCESS: (name, id) => `${e.success} | Removed item **${name}**, ID: ${id}`,
            
            ITEM_EDIT_ERR_INVALID_FIELD: (field, FIELDS) => `${e.error} | Field **${field}** not exist. Try ${FIELDS.map((p) => "`"+p+"`").join(", ")}`,
            
            ITEM_INFO_DESC: (desc) => `**Description**: ${desc}`,
            ITEM_INFO_EXPIRYTIME: (time) => `**Expiry Time**: ${this.convertMs(time)}`,
            ITEM_INFO_PRICE: (price) => `**Price**: ${clearifyNumber(price)} catnip`,
            ITEM_INFO_STOCK: (stock) => `**Stock**: ${stock}`,
            ITEM_INFO_QUANTITY: (quantity) => `**Quantity**: ${quantity}`,
            ITEM_INFO_EXPIRATION: (date) => `**Expiration**: ${date}`,
            ITEM_INFO_CLOSEAT: (date) => `**Close at**: ${date}`,
            ITEM_INFO_OPENAT: (date) => `**Open at**: ${date}`,
            ITEM_INFO_ID: (id) => `**ID**: ${id}`,

            ITEM_BUY_ERR_MAX_STOCK: (max) => `${e.error} | Maximum stock at time: ${clearifyNumber(max)}`,
            ITEM_BUY_ERR_NOT_ENOUGH_STOCK: (item, stock) => `${e.error} | Not enough stock. Only **${stock}** ${item} left`,
            ITEM_BUY_ERR_ENDED: (item, date) => `${e.error} | **${item}** has stopped selling since **${date}**`,
            ITEM_BUY_ERR_NOT_START: (item, date) => `${e.error} | **${item}** will be sold from **${date}**`,
            ITEM_BUY_ERR_NO_PRICE: (item) => `${e.error} | **${item}** has no price`,
            ITEM_BUY_SUCCESS: (user, item, quantity, price) => `${e.success} | **${user}** bought ${quantity} x **${item}** for **${clearifyNumber(price)} catnip**`,
            ITEM_SEARCH_TITLE: (key) => `Searching items for: ${key}`,

            ITEM_NOT_FOUND: `Item not found`,
            ITEM_LIST_TITLE: `CAT ITEMS`,
            ITEM_DETAIL_TITLE: `CAT ITEM`,
            ITEM_USER_LIST: (user) => `${user}'s Items`,
            ITEM_ERR_INVALID_QUANTITY: (quantity) => `${e.error} | Invalid quantity: ${quantity}`,
			ITEM_USE_ERR_ID_NOT_FOUND: (id) => `${e.error} | You do not own any item with ID: ${id}`,
            ITEM_USE_SUCCESS: (user, item, quantity) => `${e.success} | **${user}** used ${quantity} x **${item}**`,
            
            /** GADGETS */
            GADGET_DESCRIPTION: "Gadgets (*creating*)",
            GADGET_USAGE: "$gadget",
            GADGET_EXAMPLES: "$gadget",

            /** WEAPONS */
            WEAPON_DESCRIPTION: "Weapons (*creating*)",
            WEAPON_USAGE: "$weapon",
            WEAPON_EXAMPLES: "$weapon",

            /** TASK */
            TASK_DESCRIPTION: "Nhiệm vụ và Nhiệm vụ tùy chỉnh cho Giveaway",
            TASK_CREATE_DESCRIPTION: "tạo task",
            TASK_CREATE_USAGE: "$task create [name]",
            TASK_CREATE_EXAMPLES: "$task create Requirement 01",
            TASK_EDIT_DESCRIPTION: "sửa task",
            TASK_EDIT_USAGE: "$task edit [ID] [field] [value]",
            TASK_EDIT_EXAMPLES: "$task edit t001 quantity 50",
            TASK_DELETE_DESCRIPTION: "Xóa task",
            TASK_DELETE_USAGE: "$task delete [ID]",
            TASK_DELETE_EXAMPLES: "$task del t001",
            TASK_INFO_DESCRIPTION: " Thông tin Task ",
            TASK_INFO_USAGE: "$task info [ID]",
            TASK_INFO_EXAMPLES: "$task info t001",
            TASK_MINE_DESCRIPTION: "Nhiệm vụ hiện tại của bạn . Tìm tất cả hoặc tìm với `(search)`",
            TASK_MINE_USAGE: "$task mine (search)",
            TASK_MINE_EXAMPLES: "$task mine\n$task mine ga",
            TASK_LIST_DESCRIPTION: "Nhiệm vụ tùy chỉnh của bạn . Tìm tất cả hoặc tìm với `(search)`",
            TASK_LIST_USAGE: "$task list (search)",
            TASK_LIST_EXAMPLES: "$task ls",
            TASK_REROLL_DESCRIPTION: "Reroll your tasks",
            TASK_REROLL_USAGE: "$task reroll [type]",
            TASK_REROLL_EXAMPLES: `$task rr daily\n$task rr long\n${e.userPremium} $task rr premium`,

            TASK_CREATE_ERR_MAX_CUSTOM: (max) => `Bạn chỉ có tối đa **${max}** nhiệm vụ tùy chỉnh, Thử với \`sửa\` or \`xóa bỏ\``,
            TASK_CREATE_AWAIT_FORM: (forms, time) => `Vui lòng nhập loại nhiệm vụ bạn muốn (\`${time/1000}s\`)\`\`\`${forms}\`\`\``,
            TASK_CREATE_CANCEL: `Thêm nhiệm vụ đã bị hủy!`,
            TASK_CREATE_SUCCESS: (title, id, type) => `${e.success} | Đã thêm \`Task\` mới **${title}**, ID: ${id}, Loại: \`${type}\``,
            TASK_ERR_INVALID_ID: (id) => `${e.error} | ID \`Task\` không tồn tại : ${id}`,
            TASK_ERR_ID_NOT_FOUND: (id) => `${e.error} | Không tìm thấy \`Task\` với ID: ${id}`,
            TASK_DELETE_SUCCESS: (title, id) => `${e.success} | Đã xóa Task **${title}**, ID: ${id}`,
            TASK_EDIT_ERR_INVALID_FIELD: (field, FIELDS) => `${e.error} | Field **${field}** không tồn tại . Thử với \`\`\`${FIELDS}\`\`\``,
            TASK_INFO_TITLE: (title) => `**Title**: \`${title}\``,
            TASK_INFO_TIMEOUT: (time) => `**Timeout**: \`${this.convertMs(time)}\``,
            TASK_ERR_NOT_OWNER: (id) => `${e.error} | Bạn không có Task riêng **${id}**`,

            TASK_INFO_ID: (id) => `**ID**: ${id}`,
            TASK_INFO_CREATOR: (user) => `**Creator**: ${user}`,
            TASK_INFO_TYPE: (type) => `**Type**: ${type}`,
            TASK_INFO_RANDOM: (random) => `**Random assign**: \`${random}\``,
            TASK_INFO_REQUIREMENT: `Requirements`,
            TASK_INFO_REWARD: `Rewards`,
            TASK_INFO_GUILD: (guild) => `**Server**: ${guild}`,

            TASK_PROGRESS: (require, progress) => `• Progress: \`${clearifyNumber(progress)}/${clearifyNumber(require)}\``,
            TASK_DESC_SEND: (channels, content, require) => `• Gửi \`${require}\` tin nhắn \`${content}\` ${channels.length ? `tới kênh ` + channels.join(' and/or ') : ''}`,
            TASK_DESC_REACT: (emojis, link, require) => `• React emoji(s) ${emojis.length ? emojis.join(' and/or ') + ' ' : ''}to [message](${link}) for  \`${require}\` time(s)`,
            TASK_DESC_COLLECT_CATNIP: (commands, exchange, farm, require) => `• Kiếm được \`${clearifyNumber(require)}\` catnip${commands.length ? ` bằng lệnh \`${commands.join('\` and/or \`')}\`` : ''}${exchange ? ` by \`exchange\`` : ''}${farm ? ` by \`farm\`` : ''}`,
            TASK_DESC_SPEND_CATNIP: (commands,require) => `• Tiêu \`${clearifyNumber(require)}\` catnip${commands.length ? ` với lệnh \`${commands.join('\` and/or \`')}\`` : ''}`,
            TASK_DESC_HAS_CATNIP: (require) => `• Có \`${clearifyNumber(require)}\` catnip`,
            TASK_DESC_MENTION: (users, require) => `• Tag user(s) ${users.length ? users.join(' and/or ') + ' ' : ''}với \`${require}\` lần`,
            TASK_DESC_MENTIONED: (users, require) => `• Được tag ${users.length ? 'by ' + users.join(' and/or ') + ' ' : ''}với \`${require}\` lần`,
            TASK_DESC_COMMAND: (commands, users, require) => `• Sử dụng lệnh ${commands.length ? '\`' + commands.join('\` and/or \`') + '\`': ''} ${users.length ? 'on ' + users.join(' and/or ') + ' ' : ''}với \`${require}\` lần`,
            TASK_DESC_COMMANDED: (commands, users, require) => `• Có người ${users.length ? users.join(' and/or ') + ' ' : ''} sử dụng lệnh ${commands.length ? '\`' + commands.join('\` and/or \`') + '\`': ''}  lên bạn trong \`${require}\` lần`,
            TASK_DESC_ROLE: (roles, guild) => `• Có role ${roles.join(' and/or ')} tại server **${guild}**`,
            TASK_DESC_COLLECT_ITEM: (emoji, name, require) => `• Kiếm được \`${(require || '').toString().padStart(2, '0')}\` **${emoji} ${name}**`,
            TASK_DESC_HAS_ITEM: (emoji, name, require) => `• Có \`${(require || '').toString().padStart(2, '0')}\` **${emoji} ${name}**`,
            TASK_DESC_HAS_GUILD: (guild, before, after) => `• Join server **${guild}**${before ? ` trước khi \`${before}\`` : ''}${before && after ? ' and ' : ''}${after ? ` sau đó \`${after}\`` : ''}`,

            TASK_DETAIL_TITLE: `TASK DETAIL`,
            TASK_EDIT_ERR_ITEM_NO_OPTION: (OPTIONS) => `${e.error} | Không có tùy chọn được cung cấp. Thử ${OPTIONS.map((p) => "`"+p+"`").join(", ")}`,
            TASK_EDIT_ERR_CMD_NOT_FOUND: (cmd) => `${e.error} | Lệnh \`${cmd}\` không tồn tại`,
            TASK_EDIT_ERR_ITEM_MISSING_ITEMID_OR_QUANTITY: `${e.error} | Thiếu item ID hoặc quantity`,
            TASK_EDIT_ERR_ITEM_INVALID_QUANTITY: (quantity) => `${e.error} | Item quantity không tồn tại: ${quantity}`,
            TASK_EDIT_ERR_CHANNEL_NOT_FOUND: `${e.error} | kênh không tồn tại`,
            TASK_EDIT_ERR_ITEM_NOT_FOUND: (id) => `${e.error} | Item \`${id}\` không tồn tại`,
            TASK_EDIT_ERR_ADD_ITEM_NOT_MATCH: (current) => `${e.error} | Item hiện tại là: ${current}!`,
            TASK_EDIT_ERR_REMOVE_ITEM_NOT_MATCH: (current) => `${e.error} | Item hiện tại is: ${current}!`,
            TASK_SEARCH_TITLE: (key) => `Tìm kiếm Task với: ${key}`,
            TASK_LIST_TITLE: `CAT TASKS`,
            TASK_NOT_FOUND: `Task không tồn tại`,
            INVALID_MSG_LINK: `Link msg không hợp lệ`,
            TASK_USER_LIST: (user) => `${user}'s Tasks`,
            TASK_ERR_MISSING_REQUIRE_FIELD: (id, field) => `${e.error} | Task **${id}** thiếu yêu cầu bắt buộc : \`${field}\``,
            TASK_REROLL_ERR_INVALID_TYPE: (types) => `${e.error} | Loại nhiệm vụ không hợp lệ. Thử ${types.map((t) => "`"+t+"`").join(", ")}`,
            TASK_REROLL_SUCCESS: (type) => `${e.success} | Rerolled a \`${type}\` task!`,
            TASK_DONE_REWARD: (user, task, reward) => `${e.success} | **${user}**, Bạn đã hoàn thành Task **${task}** và nhận được **${reward}**`,

            /** GIVEAWAY */
            GIVEAWAY_DESCRIPTION: `Tạo Giveaway với Yêu cầu`,
            GIVEAWAY_START_DESCRIPTION: "Tạo và bắt đầu một giveaway mới . Với yêu cầu , bạn cần phải tạo Task trước!",
            GIVEAWAY_START_USAGE: "$giveaway start [duration] [winners] (--task)",
            GIVEAWAY_START_EXAMPLES: "$ga start 12h 3w\n$ga start 5d 2w --T001",
            GIVEAWAY_LIST_DESCRIPTION: "Danh sách Giveaway đang diễn ra trong máy chủ",
            GIVEAWAY_LIST_USAGE: "$giveaway list",
            GIVEAWAY_LIST_EXAMPLES: "$ga ls",
            GIVEAWAY_CANCEL_DESCRIPTION: "Hủy bỏ Giveaway",
            GIVEAWAY_CANCEL_USAGE: "$giveaway cancel [message ID]",
            GIVEAWAY_CANCEL_EXAMPLES: "$ga cc 676481304556077056",
            GIVEAWAY_END_DESCRIPTION: "Kết thúc giveaway",
            GIVEAWAY_END_USAGE: "$giveaway end [message ID]",
            GIVEAWAY_END_EXAMPLES: "$ga end 676481304556077056",
            GIVEAWAY_REROLL_DESCRIPTION: "Tìm một Winner khác (reroll)",
            GIVEAWAY_REROLL_USAGE: "$giveaway reroll [message ID]",
            GIVEAWAY_REROLL_EXAMPLES: "$ga rr 676481304556077056",

            GIVEAWAY_ERR_PERMISSION: (role, perm) => `${e.error} | Bạn cần quyền \`${perm}\` hoặc role \`${role}\` để sử dụng lệnh này!`,
            GIVEAWAY_ERR_NO_GA: `Không có Giveaway đang diễn ra trong máy chủ`,
            GIVEAWAY_LIST_TITLE: (guild) => `${guild}'s đang diễn ra Giveaway`,
            GIVEAWAY_NOT_FOUND: `${e.error} | Giveaway không tồn tại`,
            GIVEAWAY_ENDED: `${e.error} | Giveaway Kết thúc`,
            GIVEAWAY_END_ERR_PERMISSION: `${e.error} | Chỉ quản trị viên mới có thể kết thúc giveaay được tạo bởi người khác`,
            GIVEAWAY_END_ERR_GUILD_NOT_MATCH: (msg) => `${e.error} | Giveaway \`${msg}\` không được tạo trong máy chủ này!`,
            GIVEAWAY_WINNERS: (winners) => `Winner(s): ${winners}`,
            GIVEAWAY_NOT_RUNNING: `${e.error} | Giveaway này không chạy!`,
            GIVEAWAY_CANCELED_TITLE: `**GIVEAWAY CANCELED**`,
            GIVEAWAY_ENDED_TITLE: `**GIVEAWAY ENDED**`,
            GIVEAWAY_STARTED_TITLE: `**GIVEAWAY STARTED**`,
            GIVEAWAY_NOT_ENDED: `${e.error} | Giveaway này đang diễn ra!`,
            GIVEAWAY_HOST: (host) => `Người tạo: ${host}`,
            GIVEAWAY_REQUIREMENTS: `Yêu cầu`,
            GIVEAWAY_START_AWAIT_ADD_TASK: `Bạn có muốn gán yêu cầu cho giveaway này?`,
            GIVEAWAY_START_AWAIT_TASK_DESC: (descs) => `Vui lòng nhập loại task của bạn...\`\`\`${descs}\`\`\`\``,
            GIVEAWAY_START_TASK_CANCEL: `Task không tồn tại`,
            GIVEAWAY_START_ERR_INVALID_QUANTITY: `${e.error} | Không tìm thấy người thắng`,
            GIVEAWAY_ADD_TASK_ERR_NOT_PATREON: `Giveaway với điều kiện chỉ dành cho Premium\nĐăng ký ngay tại: ${l.upPremium}`,
            GIVEAWAY_REACT_DESC: (emoji) => `React ${emoji} to join`,
            GIVEAWAY_FOOTER: (quantity) => `Rolls ${quantity} win${parseInt(quantity) > 1 ? 's' :''} at`,
            GIVEAWAY_FOOTER_ENDED: (quantity) => `Rolled ${quantity} win${parseInt(quantity) > 1 ? 's' :''} at`,
            GIVEAWAY_NO_WINNERS: (title, link) => `Giveaway **${title}** không có người thắng,\nLink: ${link}`,
            GIVEAWAY_CONGRATZ: (winners, title, link) => `Chúc mừng ${winners}, bạn đã trúng giveaway **${title}**\nLink: ${link}`,
            GIVEAWAY_CANCEL: (title, link) => `Giveaway **${title}** đã hủy bỏ\nLink: ${link}`,
            GIVEAWAY_TASK_HINT: (prefix) => `Sử dụng \`${prefix}task mine ga\` để kiểm tra Task của bạn`,

            /* ITEM USAGES */
            CREATED_ROLE: (name, color, position) => `Role **${name}** created | Color: \`${color}\`, Position \`${position}\``,

            /** LOTTO */
            LOTTO_DESCRIPTION: "Mua vé và hên xui thì win lotto.",
            LOTTO_USAGE: "$lotto",
            LOTTO_EXAMPLES: "$lt",

            /** LUDO */
            LUDO_DESCRIPTION: "Ludo. (*creating*)",
            LUDO_USAGE: "$ludo",
            LOTTO_EXAMPLES: "$ld",

            /** MEDIA */
            MEDIA_DESCRIPTION: "Ảnh , phương tiện ngẫu nhiên và gifs",
            MEDIA_USAGE: "$meo\n$xinh\n$food\n$meme\n$sexy\n$zai",
            MEDIA_EXAMPLES: "$meo\n$xinh\n$food\n$meme\n$sexy\n$zai",
            

            /** UPGRADE */
            UPGRADE_DESCRIPTION: "Upgrade user to premium",
            UPGRADE_USAGE: "$upgrade [user]",
            UPGRADE_EXAMPLES: "$upgrade @komatsu#7447\n$upgrade 436520860254470156",
            UPGRADE_ERR_INVALID_MONTH: `${e.error} | Số tháng không hợp lệ!`,
            
            /** DOWNGRADE */
            DOWNGRADE_DESCRIPTION: "Downgrade user/guild from premium",
            DOWNGRADE_USAGE: "$downgrade [target ID] [months]",
            DOWNGRADE_EXAMPLES: "$downgrade 436520860254470156 1\n$downgrade 436520860254470156 1",
            
            /** FEEDBACK */
            FEEDBACK_DESCRIPTION: "Gừi phản hồi . Đính kèm ảnh để chỉ rõ bugs hơn!",
            FEEDBACK_USAGE: "$feedback [content]",
            FEEDBACK_EXAMPLES: "$fb I found an error with command high. Take a look at these images!",

            /** PREMIUM */
            PREMIUM_DESCRIPTION: "Check premium status of member and server",
            PREMIUM_USAGE: "$premium []",
            PREMIUM_EXAMPLES: "$downgra",
            PREMIUM_HELP_UPGRADE_TITLE: "Upgrade Premium",
            PREMIUM_HELP_UPGRADE_DESC: `**Upgrade**\n\t• [Donate Patreon](${l.patreon})\n\t• Một cách khác - Liên hệ với chúng tôi tại **[Cat](${l.supportChannelInvite})** để biết thêm chi tiết!`,
            ERR_NOT_PREMIUM_USER: `Bạn cần nâng cấp lên **User Premium** để sử dụng lệnh này với không hạn chế. Thử lệnh \`premium\` để biết thêm chi tiết.`,
            ERR_NOT_PREMIUM_GUILD: `Server cần upgrade  **Guild Premium** để các thành viên có thể sử dụng lệnh này với giới hạn. Sử dụng \`premium\` để biết thêm chi tiết.`,
            PREMIUM_STATUS_AUTHOR: (user) => `${user}'s premium status`,
            PREMIUM_USER_DESC: (benefits, duration, point) => `**User Premium** (${duration}, ${point} points)\n${benefits.map((b) => "\t• `"+b+"`").join("\n")}`,
            PREMIUM_GUILD_DESC: (benefits, duration) => `**Guild Premium** (${duration})\n${benefits.map((b) => "\t• `"+b+"`").join("\n")}`,

            /** ROLE */
            ROLE_DESCRIPTION: "Role commands",
            ROLE_USAGE: "",
            ROLE_EXAMPLES: "",
            ROLE_POSITION_DESCRIPTION: "Check role position",
            ROLE_POSITION_USAGE: "$role position [@role] [position]",
            ROLE_POSITION_EXAMPLES: "$role pos @dev 10",
            ROLE_POSITION_ERR_INVALID_POS: "Invalid position",

            /** ECONOMY */
            ECONOMY_DESCRIPTION: "Total balance",
            ECONOMY_USAGE: "$economy",
            ECONOMY_EXAMPLES: "$eco",
            ECONOMY_TOTAL: (total) => `Cat economy: **${clearifyNumber(total)} catnip**`,

            /** COMMAND */
            COMMAND_DESCRIPTION: "Disable, enable commands",
            COMMAND_USAGE: "$command disable\n$command enable",
            COMMAND_EXAMPLES: "$cmd d\n$cmd e",
           
            /** DISABLE */
            COMMAND_DISABLE_DESCRIPTION: "Vô hiệu hóa lệnh (hoặc tất cả) tại channel hiện tại, Các lệnh được tách bằng dấu `,`\nUse `--g` để vô hiệu hóa các lệnh trong máy chủ",
            COMMAND_DISABLE_USAGE: "$command disable (--g) [command]",
            COMMAND_DISABLE_EXAMPLES: "$cmd d say, high\n$cmd d --g voice lock\n$cmd d all",
            COMMAND_DISABLE_CMD_ALREADY: (isGuild, cmds) => `Command(s) ${cmds.map((c) => "`"+c+"`").join(", ")} đã được vô hiệu hóa tại ${isGuild ? 'server' : 'channel'}`,
            COMMAND_DISABLE_SUCCESS: (isGuild, cmds) => `${e.success} | Vô hiệu hóa lệnh ${cmds.map((c) => "`"+c+"`").join(", ")} tại ${isGuild ? 'server' : 'channel'}`,
            COMMAND_DISABLE_ALL_SUCCESS: (isGuild) => `${e.success} | Đã vô hiệu hóa tất cả lệnh ${isGuild ? 'server' : 'channel'}`,

            /** ENABLE */
            COMMAND_ENABLE_DESCRIPTION: "Cho phép lệnh (hoặc tất cả) ở kênh hiện tại, Các lệnh được tách bằng dấu `,`\nUse `--g` để cho phép các lệnh trong máy chủ",
            COMMAND_ENABLE_USAGE: "$command enable (--g) [command]",
            COMMAND_ENABLE_EXAMPLES: "$cmd e say, high\n$cmd e --g voice lock$cmd e all",
            COMMAND_ENABLE_CMD_ALREADY: (isGuild, cmds) => `Command(s) \`${cmds.map((c) => "`"+c+"`").join(", ")}\` not disabled in this ${isGuild ? 'server' : 'channel'}`,
            COMMAND_ENABLE_SUCCESS: (isGuild, cmds) => `${e.success} | Đã cho phép  \`${cmds.map((c) => "`"+c+"`").join(", ")}\` tại ${isGuild ? 'server' : 'channel'}`,
            COMMAND_ENABLE_ALL_SUCCESS: (isGuild) => `${e.success} | Đã cho phép tất cả lệnh tại ${isGuild ? 'server' : 'channel'}`,

            /* COMMON WORDS */
            ID_NOT_FOUND: (id) => `ID **${id}** không tồn tại`,
            USER_NOT_FOUND: "Người dùng không tồn tại",
            ROLE_NOT_FOUND: "Role không tồn tại",
            GUILD_NOT_FOUND: "Guild không tồn tại",
            CHANNEL_NOT_FOUND: "Channel không tồn tại",
            CHANNEL_NOT_VIEWABLE: "Kênh không xem được",
            MESSAGE_NOT_FOUND: "msg không tồn tại",
            FEATURE: "Tính Năng",
            CREATED_AT: "Tạo lúc",
            COOLDOWN: "Thời gian chờ",
            COUNT: "đếm",
            REWARD: "phần thưởng",
            FINE: "Fine",
            LANGUAGES: "Ngôn ngữ",
            KEY: "Key",
            DISABLED: "Vô hiệu hóa",
            DESCRIPTION: "Miêu tả",
            CHANNEL: "Kênh",
            NOTHING_TO_SHOW: "Nothing to show",
            RESULT: "Result",
            NO_WINNERS: "Không có người thắng !",
            BET: "Bet",
            PLAYERS: "Người chơi",
            POINTS: "điểm",
            WON: "Thắng",
            UP: "Up",
            HOST: "chủ ",
            PRICE: "Giá",
            QUANTITY: "Chất lượng",
            REWARD: "phần thưởng",
            ENDED: "Kết thúc"
        }
    }

    /**
	 * The method to get language strings
	 * @param {string} term The string or function to look up
	 * @param {...*} args Any arguments to pass to the lookup
	 * @returns {string|Function}
	 */
	get(term, ...args) {
		const value = this.language[term];
		switch (typeof value) {
			case "function": return value(...args);
			default: return value;
		}
	}

	getLang(){
		return currentLanguage;
    }

    getLangCode() {
        return langCode;
    }

	printDate(pdate, isLongDate){
        const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        let day = pdate.getDate(),
        monthIndex = pdate.getMonth(),
        year = pdate.getFullYear(),
        hour = pdate.getHours() < 10 ? "0" + pdate.getHours() : pdate.getHours(),
        minute = pdate.getMinutes() < 10 ? "0" + pdate.getMinutes() : pdate.getMinutes();

        let thedate = (isLongDate) ? day + " " + monthNames[monthIndex] + " " + year + " at " + hour + "h" + minute 
        : day + " " + monthNames[monthIndex] + " " + year
        return thedate;
	}
	
	/**
	 * Parse ms and returns a string
	 * @param {number} milliseconds The amount of milliseconds
	 * @returns The parsed milliseconds
	 */
	convertMs(milliseconds, allowZero){
		let roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;
		let days = roundTowardsZero(milliseconds / 86400000),
		hours = roundTowardsZero(milliseconds / 3600000) % 24,
		minutes = roundTowardsZero(milliseconds / 60000) % 60,
		seconds = roundTowardsZero(milliseconds / 1000) % 60;
		// if(seconds === 0 && !allowZero) seconds++;
		let isDays = days > 0,
		isHours = hours > 0,
        isMinutes = minutes > 0,
        isSeconds = seconds > 0;
		let pattern = 
        (!isDays ? "" : "{days}D ")+
        (!isHours ? "" : "{hours}H ")+
        (!isMinutes ? "" : "{minutes}M ")+
        (!isSeconds ? "" : (!isDays && !isHours && !isMinutes ? "{seconds}s" : "{seconds}S"))

		let sentence = pattern
        .replace("{duration}", pattern)
        .replace("{days}", days)
        .replace("{hours}", hours)
        .replace("{minutes}", minutes)
        .replace("{seconds}", seconds);
		return sentence.trim();
	}

}
