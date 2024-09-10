import { Link } from 'react-router-dom'
import { Card } from '../ui/card'
import { Clapperboard, Cloud, CreditCard, DoorOpen, Film, Github, House, Keyboard, LifeBuoy, LogOut, Mail, Menu, MessageSquare, Plus, PlusCircle, Settings, SunMoon, User, UserPlus, Users } from 'lucide-react'
import { useTheme } from '../theme-provider'
import { FC } from 'react'
import { useMediaQuery } from 'react-responsive'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'

interface INavigation {
	isUserAuth: boolean
	logOut: () => void
}

const Navigation: FC<INavigation> = ({ isUserAuth, logOut }) => {
	const isPhoneTable: boolean = useMediaQuery({ query: '(max-width: 823px)' })

	const { setTheme, theme } = useTheme()

	if (!isPhoneTable)
		return (
			<nav className='flex flex-col h-[100vh] bg-white w-[60px] border-r fixed mt-0 items-center justify-between top-0 left-0 mr-[100px] dark:bg-black dark:border-slate-800'>
				<div>
					<Card className='mt-5 p-[5px] transition-all rounded-lg'>
						<Link to='/home'>
							<House className='stroke-black dark:stroke-white scale-100 hover:scale-105' />
						</Link>
					</Card>
					<Card className='mt-3 p-[5px] transition-all rounded-lg'>
						<Link to={'/movies'}>
							<Film className='stroke-black dark:stroke-white scale-100 hover:scale-105' />
						</Link>
					</Card>
					<Card className='mt-3 p-[5px] transition-all rounded-lg' id='clapper'>
						<Link to={'/serials'}>
							<Clapperboard className='stroke-black dark:stroke-white scale-100 hover:scale-105' />
						</Link>
					</Card>
				</div>

				<div>
					{isUserAuth && (
						<Card
							onClick={() => {
								logOut()
							}}
							className='mb-5 p-[5px] transition-all rounded-lg'>
							<Link to={'/home'}>
								<DoorOpen className='stroke-black dark:stroke-white scale-100 hover:scale-105 cursor-pointer' />
							</Link>
						</Card>
					)}
					<Card
						className='mb-5 p-[5px] transition-all rounded-lg'
						onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
						<SunMoon className='stroke-black dark:stroke-white scale-100 hover:scale-105 cursor-pointer' />
					</Card>
					<Card className='mb-5 p-[5px] transition-all rounded-lg'>
						<Link to={'/settings'}>
							<Settings className='stroke-black dark:stroke-white scale-100 hover:scale-105' />
						</Link>
					</Card>
				</div>
			</nav>
		)
	else if (isPhoneTable)
		return (
			<DropdownMenu>
      <DropdownMenuTrigger asChild className='px-2 py-1'>
        <Button><Menu /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard className="mr-2 h-4 w-4" />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Plus className="mr-2 h-4 w-4" />
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Github className="mr-2 h-4 w-4" />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
		)
}

export default Navigation
