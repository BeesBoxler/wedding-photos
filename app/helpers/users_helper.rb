module UsersHelper
  include SessionsHelper

  def correct_user
  end

  def ownership(user)
    fname = user.name.split.first
    if fname.downcase.split(//).last == 's'
      fname = "#{fname}'"
    else
      fname = "#{fname}'s"
    end
    return fname
  end
end
